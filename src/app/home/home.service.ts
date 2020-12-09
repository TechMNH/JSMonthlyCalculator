import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  newMonth: any = '';
  monthlyTotal: any = '';

  calculateFunct(fileData: any) {
    let fileDataArray = fileData.split('\n')
    let monthlyTotal = []
    let totalsum = 0
    let yeartotal = 0
    let month = parseInt(fileData.split('\n')[0].split(':')[0].split('/')[1])
    let year = parseInt(fileData.split('\n')[0].split(':')[0].split('/')[2])

    for (let i of fileDataArray) {
      let sum = 0
      if (i.match('/') < 2) {
        yeartotal = yeartotal + totalsum
        totalsum = 0
        monthlyTotal.push(i)
        continue
      }
      if (i.match(':') > 1) {
        sum = parseFloat(i.split(' : ')[2].replace(',', ''))
        totalsum = totalsum + sum
        monthlyTotal.push(i)
        continue
      }
      let loc = i.split(' : ')[1]
      if ((loc.split(' + ')).length > 1 && loc.split(' + ')[0] != '') {
        for (let j of loc.split(' + '))
          sum = sum + parseFloat(j.replace(',', ''))
        let formated = (sum + '').replace('.00', '')
        monthlyTotal.push(i + ' : ' + formated)
        totalsum = totalsum + sum
      } else if (loc.split(' + ')[0] != '') {
        monthlyTotal.push(i + ' : ' + loc.split(' + ')[0])
        totalsum = totalsum + parseFloat(loc.split(' + ')[0].replace(',', ''))
      } else
        monthlyTotal.push(i)

      yeartotal = yeartotal + totalsum
    }

    let formated = (totalsum + '').replace('.00', '')
    monthlyTotal.push('\n------------------------ ' + formated + ' : ' + formated + ' -------------------------\n')

    let newMonth = []
    let end = 31
    year = (month == 12) ? year + 1 : year
    month = (month < 12) ? month + 1 : 1

    if ([1, 3, 5, 7, 8, 10, 12].includes(month))
      end = 32
    else if (month == 2)
      end = 29
    for (let i = 1; i < end; i++)
      newMonth.push(i + '/' + month + '/' + year + ' : ')

    newMonth.push('\n------------------------  :  -------------------------')

    // console.log(totalsum)
    // console.log(newMonth.join('\n'));
    // console.log(monthlyTotal.join('\n'));
    this.newMonth = newMonth.join('\n');
    this.monthlyTotal = monthlyTotal.join('\n');
  }

  private copyTextArea(textArea: HTMLTextAreaElement): boolean {
    const currentFocus = document.activeElement as HTMLOrSVGElement | null;

    try {
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length);
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      // Calling `.select()` on the `<textarea>` element may have also focused it.
      // Change the focus back to the previously focused element.
      currentFocus?.focus();
    }
  }

  private createTextArea(text: string): HTMLTextAreaElement {
    const docElem = document.documentElement!;
    const isRTL = docElem.getAttribute('dir') === 'rtl';

    // Create a temporary element to hold the contents to copy.
    const textArea = document.createElement('textarea');
    const style = textArea.style;

    // Prevent zooming on iOS.
    style.fontSize = '12pt';

    // Reset box model.
    style.border = '0';
    style.padding = '0';
    style.margin = '0';

    // Make the element invisible and move it out of screen horizontally.
    style.opacity = '0';
    style.position = 'fixed';
    style.top = '0';
    style[isRTL ? 'right' : 'left'] = '-999em';

    textArea.setAttribute('aria-hidden', 'true');
    textArea.setAttribute('readonly', '');
    textArea.value = text;

    return textArea;
  }

  copyText(text: string): boolean {
    // Create a `<textarea>` element with the specified text.
    const textArea = this.createTextArea(text);

    // Insert it into the DOM.
    document.body.appendChild(textArea);

    // Copy its contents to the clipboard.
    const success = this.copyTextArea(textArea);

    // Remove it from the DOM, so it can be garbage-collected.
    if (textArea.parentNode) {
      // We cannot use ChildNode.remove() because of IE11.
      textArea.parentNode.removeChild(textArea);
    }

    return success;
  }
}
