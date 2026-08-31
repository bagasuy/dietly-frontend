function MealList({ meals }) {
  if (!meals.length) {
    return (
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <span>Recent meals</span>
          <h2>Your meals</h2>
        </div>

        <div className="dashboard-empty-state">
          <p>No meals recorded yet.</p>
          <span>Start tracking your meals to see them here.</span>
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-heading">
        <span>Recent meals</span>
        <h2>Your meals</h2>
      </div>

      <div className="meal-list">
        {meals.map((meal) => (
          <article className="meal-item" key={meal.id}>
            <div>
              <strong>{meal.food_name}</strong>
              <span>{meal.meal_type}</span>
            </div>

            <div>
              <strong>{meal.calories} kcal</strong>
              <span>
                {meal.protein}g protein
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MealList
