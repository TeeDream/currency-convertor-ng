import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  allowedKeys = {
    digit: 'Digit',
    tab: 'Tab',
    escape: 'Escape',
    backspace: 'Backspace',
    arrow: 'Arrow',
    period: 'Period',
    onlyOnePeriod: '\\.',
  };

  newRegEx = (str: string) => new RegExp(str);
  checkKeys = (e: KeyboardEvent, arrOfStr: string[]): boolean => {
    return arrOfStr.some((str) => {
      if (
        str === this.allowedKeys.period ||
        str === this.allowedKeys.onlyOnePeriod
      ) {
        return false;
      }

      return this.newRegEx(str).test(e.code);
    });
  };

  validateKeyDown(e: KeyboardEvent): boolean {
    const inputValue = (e.target as HTMLInputElement).value;
    const isCtrl = e.ctrlKey;
    const isPeriod = this.newRegEx(this.allowedKeys.period).test(e.code);
    const isPeriodOne = this.newRegEx(this.allowedKeys.onlyOnePeriod).test(
      inputValue
    );

    if (
      this.checkKeys(e, Object.values(this.allowedKeys)) ||
      (isPeriod && !isPeriodOne) ||
      isCtrl
    ) {
      return true;
    }

    e.preventDefault();
    return false;
  }
}
