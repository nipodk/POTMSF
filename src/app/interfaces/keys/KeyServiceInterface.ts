export interface KeyCreateRequest {
  keyName: string,
  apiKey: string,
  createTime: Date,
  userEmail: string | null
}

export interface KeyCreateResponse {
  keyName: string,
  createTime: Date
}

export interface KeyGetResponse {
  userKeys: [KeyDto],
  userEmail: string
}

export interface KeyDto {
  keyName: string,
  apiKey: string,
  createTime: Date
}

export interface KeyUpdateRequest {
  keyDto: KeyDto,
  keyName: string,
  userEmail: string
}

export interface KeyUpdateResponse {
  keyDto: KeyDto,
  isUpdated: boolean
}


export interface KeyDeleteResponse {
  name: string,
  isDeleted: string
}

export interface KeyCheckResponse {
  apiKey: string,
  valid: boolean
}
