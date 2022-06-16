import { GeneralResponse } from "../types";

export type Topic = {
  _id?: string;
  name?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type TopicResponse = GeneralResponse & {
  doc?: Topic | null;
}
