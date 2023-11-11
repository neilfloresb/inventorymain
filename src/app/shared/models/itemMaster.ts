export interface IitemMaster {
  item_code: string;
  item_desc: string;
  base_um: string;
  qty_rcv: number;
  qty_issued: number;
  qty_for_issue: number;
  whse_code: string;

  //   public string item_code { get; set; }
  // public string base_um { get; set; }
  // public decimal qty_rcv { get; set; }
  // public decimal qty_issued { get; set; }
  // public decimal qty_for_issue { get; set; }
  // public string whse_code { get; set; }
}

export class itemMaster {
 public item_code: string;
  public item_desc: string;
  public base_um: string;
  public qty_rcv: number;
  public qty_issued: number;
  public qty_for_issue: number;
  public whse_code: string;

  //   public string item_code { get; set; }
  // public string base_um { get; set; }
  // public decimal qty_rcv { get; set; }
  // public decimal qty_issued { get; set; }
  // public decimal qty_for_issue { get; set; }
  // public string whse_code { get; set; }
}