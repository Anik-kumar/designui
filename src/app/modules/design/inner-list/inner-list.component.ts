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

  
  // editDesign(id, title) {
  //   // console.log("Design Id " , id);
  //   title = title.replace('/\s/g', '-');
  //   if(!isNil(id)) {
  //     // this.router.navigate(['/design/show', id]);
  //     this.designService.setEditDesignObj(this.designObj);
  //     this.router.navigate(['/design/edit', title]);
  //   }
  // }

  showSingleDesign(id, title) {
    // console.log("Design Id " , id);
    title = title.replace('/\s/g', '-');
    console.log("inner list clicked");
    if(!isNil(id)) {
      // this.router.navigate(['/design/show', id]);
      this.designService.setDesignId(id);
      this.router.navigate(['/design/details', title]);
      console.log("inner list clicked");
    }
  }
  

}
