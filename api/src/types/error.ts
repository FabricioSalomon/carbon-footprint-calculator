type Metadata = {};

export type BaseError = {
  status: number;
  reason: string;
  metadata?: Metadata;
};
