export type Topic = {
  _id?: string;
  name?: string;
  description?: string;
  status?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type GetTopic = Topic;
export type GetTopics = Topic[];
