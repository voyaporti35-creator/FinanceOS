export function calculateMortgageFreedom(
  remainingYears: number
) {

  const currentDate =
    new Date();


  const freedomDate =
    new Date(
      currentDate.getFullYear() +
      remainingYears,
      currentDate.getMonth(),
      currentDate.getDate()
    );


  return {

    year:
      freedomDate.getFullYear(),

    date:
      freedomDate,

  };

}