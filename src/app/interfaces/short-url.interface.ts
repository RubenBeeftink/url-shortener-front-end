export interface ShortUrl {
  id: string,
  user_id: number
  name: string,
  url: string,
  short_url: string,
  hash: string,
  expires_at: string|null,
}
