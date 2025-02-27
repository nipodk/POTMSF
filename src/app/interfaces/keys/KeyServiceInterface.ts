export interface KeyCreateRequest {
  keyName: string,
  apiKey: string,
  secreteKey: string,
  createTime: Date,
  userEmail: string | null
}

export interface KeyCreateResponse {
  keyName: string,
  createTime: Date
}

export interface KeyGetRequest {
  userKeys: [KeyDto],
  userEmail: string
}

export interface KeyDto {
  keyName: string,
  apiKey: string,
  secreteKey: string,
  createTime: Date
}
