import React, { Component, ChangeEvent } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { IoMdArrowUp, IoIosClose } from 'react-icons/io';
import { colors } from '@igg/common/lib/styleSettings';
import { SpinnerIcon, FieldMeta, SubmitErrors } from '@igg/common';
import { config } from '../config';

// Visual components

interface ItemSingleImageInputStyleProps {
  circle?: boolean;
}

const ItemSingleImageInputRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const ItemSingleImageInputFigure = styled('div')({
  position: 'relative',
  marginRight: 20,
  width: 65
});

const ItemSingleImageInputPreview = styled('div')(
  ({ circle }: ItemSingleImageInputStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    border: 0,
    borderRadius: circle ? '50%' : '33%',

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

const ItemSingleImageInputButton = styled('div')(
  ({ circle }: ItemSingleImageInputStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 65,
    height: 65,
    marginRight: 20,
    border: '1px dashed white',
    borderRadius: circle ? '50%' : '33%',
    fontSize: 18,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      color: colors.brightMain,
      borderColor: colors.brightMain
    }
  })
);

const ItemSingleImageInputInput = styled('input')({
  position: 'absolute',
  zIndex: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  opacity: 0,
  cursor: 'pointer'
});

const ItemSingleImageInputBody = styled('div')({
  flex: 1
});

const ItemSingleImageInputLabel = styled('label')({
  display: 'block',
  fontSize: 15,
  color: 'white',
  marginBottom: 5
});

const ItemSingleImageInputNote = styled('div')({
  fontSize: 13,
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.55)'
});

const ItemSingleImageInputErrorNote = styled('div')({
  fontSize: 13,
  fontStyle: 'italic',
  color: '#af4a4a'
});

export const ItemSingleImageRemoveButton = styled('button')({
  position: 'absolute',
  zIndex: 2,
  top: -5,
  right: -5,
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

// Exported component

export interface ItemSingleImageInputProps {
  value?: string;
  onChange?: (value?: string) => void;
  meta?: FieldMeta;
  uploadUrl: string;
  initialLabel: string;
  uploadedLabel?: string;
  imageShape?: 'circle';
}

export interface ItemSingleImageInputState {
  selectedFile?: any;
  previewUrl?: string;
  uploading?: boolean;
  uploadPercent?: number;
  uploadSuccess?: boolean;
  uploadError?: boolean;
  uploadErrorMessage?: string;
  // TODO: uploadCancelToken?: string;
}

export class ItemSingleImageInput extends Component<
  ItemSingleImageInputProps,
  ItemSingleImageInputState
> {
  state: ItemSingleImageInputState = {};

  handleChange = (value?: string) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.handleFileSelect(event.target.files);
  };

  handleFileSelect = (fileList: FileList | null) => {
    const { upload } = this;

    if (fileList && fileList[0]) {
      const selectedFile = fileList[0];

      this.setState(state => ({
        selectedFile,
        previewUrl: getPreviewUrl(fileList[0])
      }));

      upload(selectedFile);
    }
  };

  handleImageUpload = (imageUrl: string) => {
    this.setState({
      previewUrl: imageUrl
    });

    this.handleChange(imageUrl);
  };

  upload = (file: File) => {
    const { handleImageUpload } = this;
    const { uploadUrl } = this.props;

    const formData = new FormData();
    formData.append('file', file);

    this.setState({ uploading: true });

    return axios
      .post(`${config.apiUrl}${uploadUrl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          this.setState({
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

        this.setState({
          uploading: false,
          uploadError: false,
          uploadErrorMessage: void 0,
          uploadSuccess: true
        });

        handleImageUpload(response.data.imageUrl);
        return Promise.resolve(response);
      })
      .catch((error: any) => {
        this.setState({
          selectedFile: void 0,
          previewUrl: void 0,
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
  };

  remove = () => {
    const { previewUrl } = this.state;

    this.setState({
      selectedFile: void 0,
      previewUrl: void 0,
      uploading: false,
      uploadPercent: void 0,
      uploadError: false,
      uploadErrorMessage: void 0,
      uploadSuccess: false
    });

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    this.handleChange();
  };

  render() {
    const { handleFileInputChange, remove } = this;
    const {
      previewUrl,
      selectedFile,
      uploading,
      uploadSuccess,
      uploadError,
      uploadErrorMessage
    } = this.state;
    const { value, meta, initialLabel, uploadedLabel, imageShape } = this.props;
    const imageUrl = value || previewUrl;

    const isCircle = imageShape === 'circle';

    return (
      <ItemSingleImageInputRoot>
        <ItemSingleImageInputFigure>
          {imageUrl || selectedFile || uploadSuccess ? (
            <>
              <ItemSingleImageInputPreview circle={isCircle}>
                {uploading ? <SpinnerIcon size={55} /> : <img src={imageUrl} />}
              </ItemSingleImageInputPreview>
              <ItemSingleImageRemoveButton type="button" onClick={remove}>
                <IoIosClose />
              </ItemSingleImageRemoveButton>
            </>
          ) : (
            <ItemSingleImageInputButton circle={isCircle}>
              <ItemSingleImageInputInput
                type="file"
                onChange={handleFileInputChange}
              />
              <IoMdArrowUp />
            </ItemSingleImageInputButton>
          )}
        </ItemSingleImageInputFigure>

        <ItemSingleImageInputBody>
          <ItemSingleImageInputLabel>
            {imageUrl
              ? uploadedLabel || 'Image successfully uploaded'
              : selectedFile
              ? selectedFile.name
              : initialLabel || 'Upload image'}
          </ItemSingleImageInputLabel>

          {uploadError ? (
            <ItemSingleImageInputErrorNote>
              {uploadErrorMessage || 'Error uploading image'}
            </ItemSingleImageInputErrorNote>
          ) : meta && meta.submitError ? (
            <ItemSingleImageInputErrorNote>
              <SubmitErrors fieldMeta={meta} />
            </ItemSingleImageInputErrorNote>
          ) : (
            <ItemSingleImageInputNote>
              {imageUrl
                ? 'Looks great!'
                : selectedFile
                ? formatBytes(selectedFile.size)
                : 'Max size 5 MB, only JPG and PNG'}
            </ItemSingleImageInputNote>
          )}

          {/* {(imageUrl || selectedFile) && (
            <ItemSingleImageRemoveButton type="button" onClick={remove}>
              <IoIosCloseCircle />
              <span>Remove</span>
            </ItemSingleImageRemoveButton>
          )} */}
        </ItemSingleImageInputBody>
      </ItemSingleImageInputRoot>
    );
  }
}

export default ItemSingleImageInput;
