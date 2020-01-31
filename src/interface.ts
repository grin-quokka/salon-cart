export interface AppState {
  loading: boolean;
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  } | null;
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
  selectDiscount: {
    [discountKey: string]: { name: string; rate: number; items: string[] };
  }[];
}

export interface AppFnc {
  handleItemSelect: (
    arr:
      | {
          [itemKey: string]: { count: number; name: string; price: number };
        }[]
      | {
          [discountKey: string]: {
            name: string;
            rate: number;
            items: string[];
          };
        }[],
    arrName: string
  ) => void;
  hadleItemEdit: (itemKey: string, count: number) => void;
  handleItemRemove: (itemKey: string) => void;
  handleDisEdit: (
    disKey: string,
    discountsObj: { name: string; rate: number; items: string[] }
  ) => void;
  handleDisRemove: (disKey: string) => void;
}
