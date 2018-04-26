import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConstantsModule } from '../constants.module';


@Component({

   templateUrl: './imagebutton.render.component.html',
})
export class ImageButtonRenderComponent implements OnInit {

  public renderValue = {};
  public showImg: boolean;
  public reportImage;
  public nullImg: boolean;

  @Input() value: any;
  @Input() rowData: any;

  constructor(public http: HttpClient) {
      this.showImg = false;
   }

  ngOnInit() {
    this.renderValue = this.value;
  }

  returnToButton(){
    this.nullImg = false;
    this.showImg = false;
  }


  showImage() {

    let url ="";
    let photoId = this.rowData.id;
    switch(this.value)
    {
      case ConstantsModule.trailReports:
      {
        url = ConstantsModule.conditonURL;
        break;
      }
      case ConstantsModule.poiReports :
      {
        url = ConstantsModule.poiURL;
        break;
      }
      default:
      {
        alert("Error getting picture");
      }
    }

    this.http.get(url + "/getImageById/" + photoId).subscribe( res => {
          if(res[0] == null)
            this.nullImg = true;
          else{
            this.showImg = true;
            this.nullImg = false;
			var s_image = this.byteArrayToString(res[0].image);
            this.reportImage = "data:image/jpeg;base64," +  s_image;
          }
       });
  }

    byteArrayToString(array)
   {
  	var result = "";
  	for(var i = 0; i < array.length; ++i){
  		result+= (String.fromCharCode(array[i]));
  	}
  	return result;
}


}
