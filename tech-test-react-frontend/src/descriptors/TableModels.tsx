export interface ITableData {
  name: string;
  priceInPounds: number;
  status: "active" | "disabled" | "pendingReview";
  categories: Array<string>;
};

export enum EStatus {
  active = "Active",
  pendingReview = "Pending Review",
  disabled = "Disabled",
};
