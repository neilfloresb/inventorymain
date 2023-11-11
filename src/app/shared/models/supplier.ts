export interface ISupplier {

  supp_code: string;
  supp_name: string;
  address?: string;
  tin_no?: string;
  // public string supp_code { get; set; }
  //       public string ? supp_name { get; set; }
  //       public string ? address { get; set; }
  //       public string ? tin_no { get; set; }
}


export interface ISupplierCombo {

  supp_code: string;
  supp_name: string;
}

export class PuchaseOrder {
  po_no: string
}
