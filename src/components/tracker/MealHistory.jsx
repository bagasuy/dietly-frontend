function MealHistory({ meals }) {
  return (
    <section className="tracker-section">
      <div className="tracker-section-heading">
        <span>Meal history</span>
        <h2>Your meals</h2>
        <p>
          Review the meals you have recorded in your nutrition history.
        </p>
      </div>

      {!meals.length ? (
        <div className="dashboard-empty-state">
          <p>No meals recorded yet.</p>
          <span>
            Add your first meal using the form above.
          </span>
        </div>
      ) : (
        <div className="tracker-meal-list">
          {meals.map((meal) => (
            <article className="tracker-meal-item" key={meal.id}>
              <div>
                <strong>{meal.food_name}</strong>
                <span>{meal.meal_type}</span>
              </div>

              <div>
                <strong>{meal.calories} kcal</strong>
                <span>
                  {meal.protein}g protein ·{" "}
                  {meal.carbohydrates}g carbs ·{" "}
                  {meal.fat}g fat
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default MealHistory
