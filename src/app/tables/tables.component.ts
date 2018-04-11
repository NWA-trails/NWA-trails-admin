import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConstantsModule } from '../constants.module';
import { HttpClient } from '@angular/common/http';


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

  constructor(public http : HttpClient) {
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

  buildConditionTable(data)
  {
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
    active: {
      title: 'Is report active?',
      editable: false
    },
  },
  actions: {
    columnTitle: "",
    add: false,
    edit: false
  }
};

this.data = data;
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
