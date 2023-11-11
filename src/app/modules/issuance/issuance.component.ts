import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { mapapi } from 'src/app/shared/iUrlpath';


const _PrintResoure = mapapi.PrintResource;

@Component({
  selector: 'app-issuance',
  templateUrl: './issuance.component.html',
  styleUrls: ['./issuance.component.scss']
})
export class IssuanceComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer1') viewer: TelerikReportViewerComponent;
  public link_report_resource = _PrintResoure;
  public rs;

  ngAfterViewInit(): void {
    // Localization demo.
    // const language = navigator.language;
    // let resources = StringResources.english; // Default.

    // if (language === 'ja-JP') {
    //   resources = StringResources.japanese;
    // }


    // this.rs = {
    //   report: 'Sample1.trdp',
    //   parameters: {}
    // };
    // //  }

    // this.viewer.refreshReport()
    // /*** SET REPORTSOURCE is import to Refresh Report */
    // this.viewer.setReportSource(this.rs);

    // this.viewer.viewerObject.stringResources = Object.assign(this.viewer.viewerObject.stringResources, resources);
  }

  ngOnInit(): void {

    this.rs = {
      report: 'Sample1.trdp',
      parameters: {}
    };
    //  }

    this.viewer.refreshReport()
    /*** SET REPORTSOURCE is import to Refresh Report */
    this.viewer.setReportSource(this.rs);
  }


  title = 'Report Viewer';
  viewerContainerStyle = {
    position: 'relative',
    width: '100vh',
    height: '80vh',
    // width: '100%',
    // height: '100%',
    left: '20px',
    ['font-family']: 'Verdana, Arial,Effra'
  };

  // title = "Report Viewer";
  // viewerContainerStyle = {
  //   position: 'absolute',
  //   left: '5px',
  //   right: '5px',
  //   top: '40px',
  //   bottom: '5px',
  //   overflow: 'hidden',
  //   clear: 'both',
  //   ['font-family']: 'ms sans serif'
  // };

  ready() {
    console.log('ready');
  }
  viewerToolTipOpening(e: any, args: any) {
    console.log('viewerToolTipOpening ' + args.toolTip.text);
  }


}
