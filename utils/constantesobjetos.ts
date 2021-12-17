export class ConstantesObjetos {
  static APP_DATE_FORMATS =
    {
      parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
      },
      display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        // monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
        monthYearLabel: 'inputMonth',
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
      }
    }
}
