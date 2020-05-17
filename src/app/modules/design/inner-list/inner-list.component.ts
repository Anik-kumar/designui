import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { DesignService } from '@modules/design/design.service';
import { isNil } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inner-list',
  templateUrl: './inner-list.component.html',
  styleUrls: ['./inner-list.component.scss']
})
export class InnerListComponent implements OnInit {

  @Input() designObj;

  constructor(
    private authorizationService: AuthorizationService, 
    private designService: DesignService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.designObj);
  }

  showSingleDesign(id, title) {
    // console.log("Design Id " , id);
    title = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    // console.log("inner list clicked");
    if(!isNil(id)) {
      this.designService.setDesignId(id);
      this.router.navigate(['/design/details', title]);
      // console.log("inner list clicked");
    }
  }
  

}
