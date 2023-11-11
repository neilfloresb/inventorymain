export interface payablehdr {
  payid: number;
  supp_code: string;
  po_no: string;
  ref_no?: string;
  dr_date: string;
  branchname: string;
  projectname: string;
  bankcode: string;
  checkno?: string;
  checkdate?: string;
  cvno?: string;
  status?: StatusCode;

  // public int payid { get; set; }
  // public string supp_code { get; set; }
  // public string po_no { get; set; }
  // public string ref_no { get; }
  // public DateTime dr_date { get; set; }
  // public string branchname { get; set; }
  // public string projectname { get; set; }
  // public string ? bankcode { get; set; }
  // public string ? checkno { get; set; }
  // public DateTime ? checkdate { get; set; }
  // public string cvno { get; set; }
}

export interface payDetailpo {
  po_no: string;
  po_seq: number;
  item_code: string;
  item_desc: string;
  qty_po: number;
  qty_rcv: number;
  po_um: string;
  unit_price: number;
}

export interface payableDetailPO {
  payidno: number;
  payid: number;
  po_no: string;
  po_seq: number;
  item_code: string;
  item_desc: string;
  qty_po: number;
  qty_rcv: number;
  po_um: string;
  unit_price: number;
}



export enum StatusCode {
  Unchanged,
  Added,
  Deleted,
  Updated
}


type ActionType = 'add' | 'update' | 'delete' | 'none';
export interface Action<T> {
  item: T;
  action: ActionType;
}