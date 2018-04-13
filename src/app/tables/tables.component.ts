import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConstantsModule } from '../constants.module';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
  tableOptions = ["Trail Condition Reports", "Users"];
  selectedTable = 'Users';


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
      this.http.get(ConstantsModule.conditonURL + "/getActive").subscribe( res => {
         console.log(_.keys(res[0]));
         this.buildConditionTable(res);


       });
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to edit?')) {
      event.newData['active'] = this.yesOrNoToBoolean(event.newData['active']) ;
      event.newData['acknowledged'] = this.yesOrNoToBoolean(event.newData['acknowledged']) ;
      event.confirm.resolve(event.newData);
      this.updateActivationAndAcknowledgment(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  updateActivationAndAcknowledgment(record)
  {
    console.log(ConstantsModule.conditonURL + "/markInactiveById/" + record.id);
    if(record.active == true)
      this.http.put(ConstantsModule.conditonURL + "/markActiveById/" + record.id, {} ).subscribe( res => {
         console.log(JSON.stringify(res));
       });
    else
      this.http.put(ConstantsModule.conditonURL + "/markInactiveById/" + record.id, {} ).subscribe( res => {
         console.log(JSON.stringify(res));
       });

    if(record.acknowledged == true)
      this.http.put(ConstantsModule.conditonURL + "/markAcknowledgedById/" + record.id, {} ).subscribe( res => {});
    else
      this.http.put(ConstantsModule.conditonURL + "/markUnacknowledgedById/" + record.id, {} ).subscribe( res => {});

  }

  buildConditionTable(data)
  {
    console.log(data);
      this.data = data;
      for(var i = 0; i < data.length; i++)
      {
        this.data[i].image =this.transform("<a  (click)=\"f()\" onmouseover=\"\" style=\"cursor: pointer;\">View image</a>");
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
    image: {
      title: "Image",
      editable: false,
      type: 'html'
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
    columnTitle: "",
    add: false,
    edit: true
  },
  edit:{
    confirmSave: true,
    mode: 'inline'

  }

 };

}
f()
{
  console.log("clicked");
}

booleanToYesOrNo(val)
{
  return (val===true || val == 'Yes') ? 'Yes' : 'No';
}

yesOrNoToBoolean(val)
{
  return (val=='Yes' || val ===true) ? true : false;
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
      editable: false
    }
  },
  actions: {
    columnTitle: "",
    add: false,
    edit: false
  }
};

this.data = data;
}

}
