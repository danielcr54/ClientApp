export interface TweetModel {
  id: number,
  text: string,
  user: {
    name: string,
    profile_image_url_https: string
  }
  entities: {
    urls: TwitterURL[]
  }
}

export interface TwitterURL {
  url: string
}