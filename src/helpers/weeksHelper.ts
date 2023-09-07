export class WeeksHelper {
  static getWeeks = () => {
    return [
      { week: 1, startDate: '8/26/23', endDate: '9/4/23' },
      { week: 2, startDate: '9/5/23', endDate: '9/11/23' },
      { week: 3, startDate: '9/12/23', endDate: '9/18/23' },
      { week: 4, startDate: '9/19/23', endDate: '9/25/23' },
      { week: 5, startDate: '9/26/23', endDate: '10/2/23' },
      { week: 6, startDate: '10/3/23', endDate: '10/9/23' },
      { week: 7, startDate: '10/10/23', endDate: '10/16/23' },
      { week: 8, startDate: '10/17/23', endDate: '10/23/23' },
      { week: 9, startDate: '10/24/23', endDate: '10/30/23' },
      { week: 10, startDate: '10/31/23', endDate: '11/6/23' },
      { week: 11, startDate: '11/7/23', endDate: '11/13/23' },
      { week: 12, startDate: '11/14/23', endDate: '11/20/23' },
      { week: 13, startDate: '11/21/23', endDate: '11/27/23' },
      { week: 14, startDate: '11/28/23', endDate: '12/4/23' },
      { week: 15, startDate: '12/5/23', endDate: '12/11/23' }
    ];
  };

  static getCurrentWeek = () => {
    const today = new Date();
    const weeks = WeeksHelper.getWeeks();

    for (const week of weeks) {
      const startDate = new Date(week.startDate);
      const endDate = new Date(week.endDate);

      if (today >= startDate && today <= endDate) {
        return week.week;
      }

      if (today < startDate) {
        return week.week;
      }
    }

    return 1;
  };
}
