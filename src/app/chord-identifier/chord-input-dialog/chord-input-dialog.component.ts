import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chord } from 'tonal';
import { ChordRef } from 'src/app/shared/models/chord-ref.model';

@Component({
  selector: 'app-chord-input-dialog',
  templateUrl: './chord-input-dialog.component.html',
  styleUrls: ['./chord-input-dialog.component.scss']
})

export class ChordInputDialogComponent implements OnInit {
  noteForm = new FormGroup({
    notes: new FormArray([])
  });

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
   this.initializeNoteForm();

  }

  onAddNote() {
    (<FormArray>this.noteForm.get("notes")).push(
      new FormControl(null, Validators.required)
    );
  }

  onRemoveNote() {
    const chordsArray = this.noteForm.get("notes") as FormArray;
    chordsArray.removeAt(-1);
  }

  private initializeNoteForm() {
    (<FormArray>this.noteForm.get('notes')).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.noteForm.get('notes')).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.noteForm.get('notes')).push(
      new FormControl(null, Validators.required)
    );
  }

  onSubmit(noteForm: FormGroup) {
    console.log(noteForm.value);

    let chord = Chord.detect(noteForm.value.notes);

    if(chord.length === 0){

      let falseyChord = noteForm.value.notes.join(" ");
      this._snackBar.open("Chord not found for the following notes: " + falseyChord.toUpperCase(), 'Close');

      return;
    } else {
      let truthyChord = new ChordRef(chord[0], noteForm.value.notes);
      this._snackBar.open("Chord Found!");
      console.log(truthyChord);
    }
  }

  onResetForm() {
    this.noteForm.reset();
  }

  getControls() {
    return (this.noteForm.get("notes") as FormArray).controls;
  }
}
