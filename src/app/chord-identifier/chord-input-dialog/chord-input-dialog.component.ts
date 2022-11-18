import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chord-input-dialog',
  templateUrl: './chord-input-dialog.component.html',
  styleUrls: ['./chord-input-dialog.component.scss']
})
export class ChordInputDialogComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

}
