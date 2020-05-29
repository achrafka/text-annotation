import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-annot',
  templateUrl: './annot.component.html',
  styleUrls: ['./annot.component.css']
})
export class AnnotComponent implements OnInit {
      myForm: FormGroup;
      disabled = false;
      ShowFilter = false;
      limitSelection = false;
      labels: any = [];
      selectedItems: any = [];
      dropdownSettings: any = [];
      uri = 'http://localhost:5000';
      serverData: JSON;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.labels = [
      {item_id: 1, item_text: 'NORP (Nationalities or religious or political groups)'},
      {item_id: 2, item_text: 'FAC (Buildings, airports,highways,bridges,etc)'},
      {item_id: 3, item_text: 'ORG (Companies,agencies,institutions,etc)'},
      {item_id: 4, item_text: 'GPE (Countries,cities,states)'},
      {item_id: 5, item_text: 'LOC (mountain rages, bodies of water)'},
      {item_id: 6, item_text: 'PRODUCT (Objects,vehicles,foods,etc)'},
      {item_id: 7, item_text: 'EVENT (battles,wars,sports,events,etc)'},
      {item_id: 8, item_text: 'WORK_OF_ART (titles of books,songs,etc)'},
      {item_id: 9, item_text: 'LAW (Named documents made into laws)'},
      {item_id: 10, item_text: 'LANGUAGE (Any named language)'},
      {item_id: 11, item_text: 'DATE'},
      {item_id: 12, item_text: 'TIME (Time smaller than a day)'},
      {item_id: 13, item_text: 'PERCENT (%)'},
      {item_id: 14, item_text: 'MONEY'},
      {item_id: 15, item_text: 'QUANTITY (Measurements, as of weight or distance)'},
      {item_id: 16, item_text: 'ORDINAL ("First","second",etc)'},
      {item_id: 17, item_text: 'CARDINAL (Numerals that do not fall under another type)'},
    ];
    this.selectedItems = [{item_id: 4, item_text : 'GPE (Countries,cities,states)'},
    {item_id: 1, item_text : 'NORP (Nationalities or religious or political groups)'}];
    this.dropdownSettings = {
      singleSelection : false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.myForm = this.fb.group({
      lab: [this.selectedItems]
    });
  }
  onItemSelect(item: any){
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  voireText() {
    this.httpClient.get('http://127.0.0.1:5000/extract').subscribe(data =>  {
      this.serverData = data as JSON;
      console.log(this.serverData);
    });
  }
}
