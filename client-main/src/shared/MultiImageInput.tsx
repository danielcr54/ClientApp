import React, { Component, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { IoMdArrowUp, IoIosClose } from 'react-icons/io';
import { SpinnerIcon, FieldMeta, SubmitErrors } from '@igg/common';
import { colors, deviceScreenQuery } from '@igg/common/lib/styleSettings';
import { config } from '../config';

// Visual components

interface MultiImageInputStyleProps {
  imageBorderRadius?: number | string;
  buttonBorderRadius?: number | string;
  verticalLayout?: boolean;
  disabled?: boolean;
}

const MultiImageInputRoot = styled('div')(
  ({ verticalLayout }: MultiImageInputStyleProps) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    [`@media ${deviceScreenQuery.medium}`]: {
      flexDirection: verticalLayout ? 'column' : 'row',
      alignItems: verticalLayout ? 'stretch' : 'flex-start'
    }
  })
);

const MultiImageInputSelectPane = styled('div')(
  ({ verticalLayout }: MultiImageInputStyleProps) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    '&:not(:last-of-type)': {
      marginBottom: 25
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      '&:not(:last-of-type)': {
        marginBottom: verticalLayout ? 25 : 0,
        marginRight: verticalLayout ? 0 : 20
      }
    }
  })
);

const MultiImageInputPreviewPane = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center'
});

const MultiImageInputPreviewList = styled('div')(
  ({ verticalLayout }: MultiImageInputStyleProps) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginRight: -15,
    marginBottom: -15,

    [`@media ${deviceScreenQuery.medium}`]: {
      justifyContent: verticalLayout ? 'flex-start' : 'flex-end'
    }
  })
);

const MultiImageInputPreviewListItem = styled('div')({
  flexGrow: 0,
  flexShrink: 0,
  display: 'flex',
  marginRight: 20,
  marginBottom: 20
});

const MultiImageInputSelectPaneFigure = styled('div')({
  position: 'relative',
  marginRight: 20,
  width: 65
});

const StyledMultiImageInputImagePreview = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  position: 'relative',
  width: 65,
  height: 65,
  boxShadow: '2px 0 16px 0px rgba(0, 0, 0, 0.2)'
});

const StyledMultiImageInputImagePreviewOverlay = styled('div')(
  ({ imageBorderRadius }: MultiImageInputStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: imageBorderRadius ? imageBorderRadius : 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  })
);

const StyledMultiImageInputImagePreviewContent = styled('div')(
  ({ imageBorderRadius }: MultiImageInputStyleProps) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    borderRadius: imageBorderRadius ? imageBorderRadius : 5,
    fontSize: 18,
    overflow: 'hidden',

    '& > img': {
      width: '100%',
      height: '100%',
      maxWidth: '120%',
      maxHeight: '120%',
      objectFit: 'cover'
    }
  })
);

const MultiImageInputSelectButton = styled('div')(
  ({ buttonBorderRadius, disabled }: MultiImageInputStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 65,
    height: 65,
    marginRight: 20,
    border: '1px dashed white',
    borderRadius: buttonBorderRadius ? buttonBorderRadius : '33%',
    fontSize: 18,
    overflow: 'hidden',
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 0.2s',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      color: colors.brightMain,
      borderColor: colors.brightMain
    }
  })
);

const MultiImageInputFileInput = styled('input')({
  position: 'absolute',
  zIndex: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  opacity: 0,
  cursor: 'pointer'
});

const MultiImageInputSelectPaneBody = styled('div')({
  flex: 1
});

const MultiImageInputSelectPaneLabel = styled('label')({
  display: 'block',
  fontSize: 15,
  color: 'white',
  marginBottom: 5
});

const MultiImageInputSelectPaneSublabel = styled('div')({
  fontSize: 13,
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.55)'
});

const MultiImageInputError = styled('div')({
  fontSize: 13,
  fontStyle: 'italic',
  color: '#af4a4a'
});

export const MultiImageInputItemRemoveButton = styled('button')({
  position: 'absolute',
  zIndex: 2,
  top: -6,
  right: -6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
  padding: 0,
  fontSize: 20,
  lineHeight: 1,
  border: 0,
  borderRadius: '50%',
  transition: 'all 0.2s',
  backgroundColor: colors.white,
  color: colors.main,
  outline: 'none',

  '&:hover': {
    backgroundColor: colors.main,
    color: colors.white,
    cursor: 'pointer'
  },

  '&:active, &:active:hover': {
    backgroundColor: colors.main,
    color: colors.white
  }
});

// Helper functions

function getPreviewUrl(file: File) {
  // NOTE: Don't forget to URL.revokeObjectURL(file); later on
  return URL.createObjectURL(file);
}

// TODO: Extract to some sort of `@igg/common/util`
function formatBytes(bytes: number, decimals?: number) {
  if (bytes === 0) return '0 bytes';
  const k = 1024;
  const dm = !decimals || decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function mapImageUrls(images?: MultiImageInputImageState[]): string[] {
  if (!images) return [];
  return images.map(i => i.imageUrl).filter(imageUrl => !!imageUrl) as string[];
}

// Aside components

interface MultiImageInputImagePreviewProps {
  imageUrl?: string;
  inProgress?: boolean;
  onRemoveClick?: () => void;
  borderRadius?: number | string;
}

function MultiImageInputImagePreview({
  imageUrl,
  inProgress,
  onRemoveClick,
  borderRadius
}: MultiImageInputImagePreviewProps) {
  return (
    <StyledMultiImageInputImagePreview>
      <StyledMultiImageInputImagePreviewContent
        imageBorderRadius={borderRadius}
      >
        {inProgress && (
          <StyledMultiImageInputImagePreviewOverlay
            imageBorderRadius={borderRadius}
          >
            <SpinnerIcon size={40} />
          </StyledMultiImageInputImagePreviewOverlay>
        )}

        {imageUrl && <img src={imageUrl} />}
      </StyledMultiImageInputImagePreviewContent>

      <MultiImageInputItemRemoveButton type="button" onClick={onRemoveClick}>
        <IoIosClose />
      </MultiImageInputItemRemoveButton>
    </StyledMultiImageInputImagePreview>
  );
}

// Exported component

export interface MultiImageInputProps {
  value?: string[];
  onChange?: (value?: string[]) => void;
  meta?: FieldMeta;
  maxImages?: number;
  uploadUrl: string;
  initialLabel: string;
  uploadedLabel?: string;
  sublabel?: string;
  imageBorderRadius?: number | string;
  buttonBorderRadius?: number | string;
  disabled?: boolean;
}

export interface MultiImageInputImageState {
  file?: any;
  imageUrl?: string;
  previewUrl?: string;
  uploading?: boolean;
  uploadPercent?: number;
  uploadSuccess?: boolean;
  uploadError?: boolean;
  uploadErrorMessage?: string;
  // TODO: uploadCancelToken?: string;
}

export interface MultiImageInputState {
  images: MultiImageInputImageState[];
}

export function MultiImageInput({
  uploadUrl,
  value,
  onChange,
  disabled,
  meta,
  maxImages,
  initialLabel,
  uploadedLabel,
  sublabel,
  imageBorderRadius,
  buttonBorderRadius
}: MultiImageInputProps) {
  const initialValue = Array.isArray(value)
    ? value.map(i => ({
        imageUrl: i
      }))
    : [];

  const [images, setImages] = useState<MultiImageInputImageState[]>(
    initialValue
  );

  function invokeValueChange(newValue?: string[]) {
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  }

  useEffect(() => {
    invokeValueChange(mapImageUrls(images));
  }, [images]);

  function updateItemState(
    file: any,
    mergeState: Partial<MultiImageInputImageState>
  ) {
    setImages(state =>
      state.map(i =>
        i.file === file
          ? {
              ...i,
              ...mergeState
            }
          : i
      )
    );
  }

  function handleImageUpload(file: any, imageUrl: string) {
    updateItemState(file, { imageUrl });
  }

  function upload(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    updateItemState(file, { uploading: true });

    return axios
      .post(`${config.apiUrl}${uploadUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          updateItemState(file, {
            uploadPercent: Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
          });
        }
      })
      .then(response => {
        if (!response.data || !response.data.imageUrl) {
          return Promise.reject({
            error: true,
            message: 'Error uploading image file'
          });
        }

        updateItemState(file, {
          uploading: false,
          uploadError: false,
          uploadErrorMessage: void 0,
          uploadSuccess: true
        });

        handleImageUpload(file, response.data.imageUrl);
        return Promise.resolve(response);
      })
      .catch((error: any) => {
        updateItemState(file, {
          uploading: false,
          uploadError: true,
          uploadErrorMessage:
            (error &&
              error.response &&
              error.response.data &&
              error.response.data.message) ||
            'Error uploading image file'
        });
        return Promise.reject(error);
      });
  }

  function handleFileSelect(fileList: FileList | null) {
    if (fileList && fileList[0]) {
      const selectedFile = fileList[0];

      setImages(state => [
        ...state,
        {
          file: selectedFile,
          previewUrl: getPreviewUrl(fileList[0])
        }
      ]);

      upload(selectedFile);
    }
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFileSelect(event.target.files);
  }

  function handleImageRemove(image: MultiImageInputImageState) {
    setImages(state => state.filter(i => i !== image));
    if (image.previewUrl) URL.revokeObjectURL(image.previewUrl);
  }

  const isSingleImage = maxImages && maxImages === 1;
  const isMultiImages = !isSingleImage;
  const firstImage = (!!images.length && images[0]) || void 0;
  const inputDisabled = disabled || (!!maxImages && images.length >= maxImages);

  const formattedSublabel =
    (isSingleImage &&
      firstImage &&
      firstImage.file &&
      formatBytes(images[0].file.size)) ||
    sublabel;

  return (
    <MultiImageInputRoot>
      <MultiImageInputSelectPane>
        <MultiImageInputSelectPaneFigure>
          {isSingleImage &&
          firstImage &&
          (firstImage.previewUrl || firstImage.imageUrl) ? (
            <MultiImageInputImagePreview
              imageUrl={firstImage.imageUrl || firstImage.previewUrl}
              inProgress={firstImage.uploading}
              borderRadius={imageBorderRadius}
              onRemoveClick={() => handleImageRemove(firstImage)}
            />
          ) : (
            <MultiImageInputSelectButton
              disabled={inputDisabled}
              buttonBorderRadius={buttonBorderRadius}
            >
              <MultiImageInputFileInput
                type="file"
                onChange={handleFileInputChange}
              />
              <IoMdArrowUp />
            </MultiImageInputSelectButton>
          )}
        </MultiImageInputSelectPaneFigure>

        <MultiImageInputSelectPaneBody>
          <MultiImageInputSelectPaneLabel>
            {isSingleImage && !!firstImage
              ? uploadedLabel || 'Image successfully uploaded'
              : initialLabel || 'Upload image'}
          </MultiImageInputSelectPaneLabel>

          {isSingleImage && firstImage && firstImage.uploadError ? (
            <MultiImageInputError>
              {firstImage.uploadErrorMessage || 'Error uploading image'}
            </MultiImageInputError>
          ) : meta && meta.submitError ? (
            <MultiImageInputError>
              <SubmitErrors fieldMeta={meta} />
            </MultiImageInputError>
          ) : formattedSublabel ? (
            <MultiImageInputSelectPaneSublabel>
              {formattedSublabel}
            </MultiImageInputSelectPaneSublabel>
          ) : null}
        </MultiImageInputSelectPaneBody>
      </MultiImageInputSelectPane>

      {isMultiImages && !!images.length && (
        <MultiImageInputPreviewPane>
          <MultiImageInputPreviewList>
            {images.map(image => (
              <MultiImageInputPreviewListItem
                key={image.imageUrl || image.previewUrl}
              >
                <MultiImageInputImagePreview
                  imageUrl={image.imageUrl || image.previewUrl}
                  inProgress={image.uploading}
                  borderRadius={imageBorderRadius}
                  onRemoveClick={() => handleImageRemove(image)}
                />
              </MultiImageInputPreviewListItem>
            ))}
          </MultiImageInputPreviewList>
        </MultiImageInputPreviewPane>
      )}
    </MultiImageInputRoot>
  );
}
