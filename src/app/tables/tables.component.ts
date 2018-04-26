import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConstantsModule } from '../constants.module';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImageButtonRenderComponent } from './imagebutton.render.component';

import * as _ from 'underscore';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  settings;
  data;
  name: string;
  tableOptions = ConstantsModule.tableOptions;
  selectedTable = this.tableOptions[0];



  constructor(public http : HttpClient, private domSanitizer: DomSanitizer) {
  }

  transform(html: string): SafeHtml {
     return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.chooseTable();


  }

  chooseTable()
  {
    if(this.selectedTable == "Users")
    {
      this.http.get(ConstantsModule.userURL + "/getAll").subscribe( res => {
         this.buildUserTable(res);
       });
    }
    else if(this.selectedTable == "Trail Condition Reports")
    {
      this.http.get(ConstantsModule.conditonURL + "/getAllNoImage").subscribe( res => {
         console.log(_.keys(res[0]));
         this.buildConditionsTable(res);
       });
    }
    else if(this.selectedTable == "Points of Interest")
    {
      this.http.get(ConstantsModule.poiURL + "/getAllNoImage").subscribe( res => {
         this.buildPOITable(res);
       });
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to edit?')) {

      event.newData['active'] = this.yesOrNoToBoolean(event.newData['active']) ;
      event.newData['acknowledged'] = this.yesOrNoToBoolean(event.newData['acknowledged']) ;
      event.newData['approved'] = this.yesOrNoToBoolean(event.newData['approved']) ;

      event.confirm.resolve(event.newData);
      this.update(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event)
  {
    if(window.confirm('Are you sure you want to delete?'))
    {
      var record = event.data;
       console.log(record.id);
       event.confirm.resolve(event.data);
       var url = "";
       switch(this.selectedTable)
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
         case ConstantsModule.users:
         {
           url = ConstantsModule.userURL;
           break;
         }
         default:
         {
           alert("Error deleting row");
         }
       }
       this.http.put(url + "/deleteById/" + record.id, {} ).subscribe( res => {
          console.log(JSON.stringify(res));
        });
        event.confirm.resolve(event.data);
    }
    else
    {
      event.confirm.reject();
    }



  }

  update(record)
  {
    switch(this.selectedTable){
      case ConstantsModule.trailReports:
      {
        if(record.active == true)
          this.http.put(ConstantsModule.conditonURL + "/markActiveById/" + record.id, {} ).subscribe( res => {
             console.log(JSON.stringify(res));
           });
        else
          this.http.put(ConstantsModule.conditonURL + "/markInactiveById/" + record.id, {} ).subscribe( res => {
             console.log(JSON.stringify(res));
           });

        if(record.acknowledged == true)
          this.http.put(ConstantsModule.conditonURL + "/markAcknowledgedById/" + record.id, {} ).subscribe( res => {
            console.log(JSON.stringify(res));
          });
        else
          this.http.put(ConstantsModule.conditonURL + "/markUnacknowledgedById/" + record.id, {} ).subscribe( res => {
            console.log(JSON.stringify(res));
          });
      }
      case ConstantsModule.poiReports:
      {
        console.log(record);
        if(record.active == true)
          this.http.put(ConstantsModule.poiURL + "/markActiveById/" + record.id, {} ).subscribe( res => {
             console.log(JSON.stringify(res));
           });
        else
          this.http.put(ConstantsModule.poiURL + "/markInactiveById/" + record.id, {} ).subscribe( res => {
             console.log(JSON.stringify(res));
           });

        if(record.approved == true)
          this.http.put(ConstantsModule.poiURL + "/markApprovedById/" + record.id, {} ).subscribe( res => {
            console.log(JSON.stringify(res));
          });
        else
          this.http.put(ConstantsModule.poiURL + "/markUnapprovedById/" + record.id, {} ).subscribe( res => {
            console.log(JSON.stringify(res));
          });
      }
      case ConstantsModule.users:
      {
        if(record.role == ConstantsModule.adminRole)
          this.http.put(ConstantsModule.userURL + "/makeAdminById/" + record.id, {} ).subscribe( res => {
            console.log(JSON.stringify(res));
          });
        else if(record.role == ConstantsModule.limitedRole)
        this.http.put(ConstantsModule.poiURL + "/revokeAdminById/" + record.id, {} ).subscribe( res => {
          console.log(JSON.stringify(res));
        });
      }
  }
  }
  f(event)
  {
    console.log(event);
  }


  buildConditionsTable(data)
  {

      this.data = data;
       //this.source.add({id: 1,check1: true,check2: false,button: 'HI!'});
      for(var i = 0; i < data.length; i++)
      {
        this.data[i].button = this.selectedTable; //this is to tell the component what type of report it is
        this.data[i].timestamp = new Date(this.data[i].timestamp);
        // if(this.data[i].id == 163){
        //   console.log("the data for 163");
        //   console.log(this.data[i]);
        // }
      }

    this.settings = {
  columns: {
    id: {
      title: 'ID',
      editable: false
    },
    username: {
      title: 'User Name',
      editable: false
    },
    timestamp: {
      title: 'Time Reported',
      editable: false
    },
    trail: {
      title: 'Trail',
      editable:false
    },
    description: {
      title: 'Description',
      editable: false
    },
    lat: {
      title: 'Lat Position',
      editable: false
    },
    lng: {
      title: 'Lng Position',
      editable: false
    },
    button: {
      title: "Image",
      editable: false,
      type: "custom",
      renderComponent: ImageButtonRenderComponent
    },

    active: {
      valuePrepareFunction: (value) => this.booleanToYesOrNo(value),
      title: 'Is report active?',
      editable: true,
      editor: {
        type: 'checkbox',
        config: {
          true: 'Yes',
          false: 'No'
        }
      },
      filter: {
       type: 'list',
       config: {
         selectText: 'Select...',
         list: [
           { value: true, title: 'Yes' },
           { value: false, title: 'No' }
         ],
       },

    },
    },
    acknowledged: {
      valuePrepareFunction: (value) => this.booleanToYesOrNo(value),
      title: 'Acknowledged by the City?',
      editable: true,
      editor: {
        type: 'checkbox',
        config: {
          true: 'Yes',
          false: 'No'
        }
      },
      filter: {
       type: 'list',
       config: {
         selectText: 'Select...',
         list: [
           { value: true, title: 'Yes' },
           { value: false, title: 'No' }
         ],
       },

    },

    },

  },
  actions: {
    columnTitle: '',
    position: 'right',

    add: false,
    edit: true
  },

  edit:{
    confirmSave: true,
    mode: 'inline'

  },
  delete:{
    confirmDelete:true,
  }

 };

}

buildPOITable(data)
{

    this.data = data;
    for(var i = 0; i < data.length; i++)
    {
      this.data[i].button = this.selectedTable; //this is to tell the component what type of report it is
      this.data[i].timestamp = new Date(this.data[i].timestamp);
    }

  this.settings = {
columns: {
  id: {
    title: 'ID',
    editable: false
  },
  username: {
    title: 'User Name',
    editable: false
  },
  timestamp: {
    title: 'Time Reported',
    editable: false
  },
  trail: {
    title: 'Trail',
    editable:false
  },
  description: {
    title: 'Description',
    editable: false
  },
  lat: {
    title: 'Lat Position',
    editable: false
  },
  lng: {
    title: 'Lng Position',
    editable: false
  },
  button: {
      title: "Image",
      editable: false,
      type: "custom",
      renderComponent: ImageButtonRenderComponent
   },

  active: {
    valuePrepareFunction: (value) => this.booleanToYesOrNo(value),
    title: 'Is report active?',
    editable: true,
    editor: {
      type: 'checkbox',
      config: {
        true: 'Yes',
        false: 'No'
      }
    },
    filter: {
     type: 'list',
     config: {
       selectText: 'Select...',
       list: [
         { value: true, title: 'Yes' },
         { value: false, title: 'No' }
       ],
     },

  },
  },
  approved: {
    valuePrepareFunction: (value) => this.booleanToYesOrNo(value),
    title: 'Approved for display?',
    editable: true,
    editor: {
      type: 'checkbox',
      config: {
        true: 'Yes',
        false: 'No'
      }
    },
    filter: {
     type: 'list',
     config: {
       selectText: 'Select...',
       list: [
         { value: true, title: 'Yes' },
         { value: false, title: 'No' }
       ],
     },

  },

  },

},
actions: {
  columnTitle: '',
  position: 'right',

  add: false,
  edit: true
},
edit:{
  confirmSave: true,
  mode: 'inline'

},
delete:{
  confirmDelete:true,
}

};

}

booleanToYesOrNo(val)
{
  return (val===true || val === 'Yes') ? 'Yes' : 'No';
}

yesOrNoToBoolean(val)
{
  return (val==='Yes' || val ===true) ? true : false;
}




  buildUserTable(data)
  {

    this.settings = {
  columns: {
    id: {
      title: 'ID',
      editable: false
    },
    first_name: {
      title: 'First Name',
      editable: false
    },
    last_name: {
      title: 'Last Name',
      editable: false
    },
    username: {
      title: 'User Name',
      editable: false
    },
    email: {
      title: 'Email',
      editable: false
    },
    role: {
      title: 'Role',
      editable: true,
      editor: {
        type: 'list',
        config: {
          selectText: 'Select Role...',
          list: [
            { value: ConstantsModule.limitedRole, title:"Limited User" },
            { value: ConstantsModule.adminRole, title:"Admin User" }
          ],
        },
      },
      filter: {
       type: 'list',
       config: {
         selectText: 'Select Role...',
         list: [
           { value: ConstantsModule.limitedRole, title:"Limited User" },
           { value: ConstantsModule.adminRole, title:"Admin User" }
         ],
       },

    },
    }
  },

  actions: {
    columnTitle: '',
    position: 'right',

    add: true,
    edit: true
  },
  add: {
    confirmCreate: true
  },
  edit:{
    confirmSave: true,
    mode: 'inline'

  },
  delete:{
    confirmDelete:true,
  }
};

this.data = data;
}

}
