import ExpensePieChart from "./ExpensePieChart";

function CategoryBreakdown({ expenses }) {

  const breakdown = expenses.reduce((acc, expense) => {

    const existingCategory = acc.find(
      item => item.name === expense.category
    );

    if (existingCategory) {

      existingCategory.value += Number(expense.amount);

    } else {

      acc.push({
        name: expense.category,
        value: Number(expense.amount),
      });

    }

    return acc;

  }, []);

  return (
    <ExpensePieChart data={breakdown} />
  );
}

export default CategoryBreakdown;