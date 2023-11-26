export const modelTypeTooltips = {
  'Linear Regression': (
    <div>
      Linear Regression is a basic yet powerful tool for predicting a quantity
      based on its relationship with other factors. Think of it as finding the
      best straight-line fit through a set of data points.
    </div>
  ),
  ARIMA: (
    <div>
      ARIMA is a widely-used method for forecasting future trends based on past
      data. It's particularly good at capturing patterns in data that unfold
      over time, like sales trends.
    </div>
  ),
  SARIMA: (
    <div>
      SARIMA extends ARIMA to better handle seasonal data — that is, data that
      shows regular patterns at certain times of the year, like holiday sales
      spikes.
    </div>
  ),
  XGBoost: (
    <div>
      XGBoost is a modern way of making predictions using complex data. It's
      known for being fast and accurate, often used in data science competitions
      for its top-notch results.
    </div>
  ),
  LightGBM: (
    <div>
      LightGBM is a type of algorithm that's efficient and effective for
      analyzing large amounts of data. It's great for scenarios where quick data
      insights are needed without sacrificing accuracy.
    </div>
  ),
  Catboost: (
    <div>
      Catboost is designed to work well with data that includes categories, like
      colors, sizes, or types. It's user-friendly and known for delivering
      reliable predictions efficiently.
    </div>
  ),
  AdaBoost: (
    <div>
      AdaBoost is a technique that combines several simple models to create a
      more powerful and accurate prediction tool. It's like assembling a team
      where each member contributes to a stronger overall performance.
    </div>
  ),
  'Random Forest': (
    <div>
      Random Forest uses multiple decision-making paths to analyze data and make
      predictions. It's like consulting a panel of experts rather than relying
      on a single opinion, resulting in more reliable outcomes.
    </div>
  ),
  'Decision Tree': (
    <div>
      A Decision Tree is like a flowchart that makes decisions based on certain
      information. Each branch of the tree helps in making a decision by
      considering different scenarios.
    </div>
  ),
  Prophet: (
    <div>
      Prophet is a forecasting tool developed by Facebook that's especially good
      at handling data with strong seasonal patterns. It's user-friendly and
      works well with daily, weekly, and yearly trends.
    </div>
  ),
  LSTM: (
    <div>
      LSTM is a sophisticated method used for predicting trends over time,
      particularly when the timing of past events is crucial. It's like having a
      memory that focuses on what's most relevant for future predictions.
    </div>
  ),
  'Gaussian Processes': (
    <div>
      Gaussian Processes are used for making predictions when you're not only
      interested in 'what' will happen but also 'how confident' you can be about
      the prediction. They provide a flexible way to understand trends and
      uncertainties in your data.
    </div>
  ),
  'Holt-Winters Exponential Smoothing': (
    <div>
      This method is particularly effective for forecasting data with trends and
      seasonal patterns, such as predicting sales figures or customer demand
      over time.
    </div>
  ),
  'Vector Autoregression': (
    <div>
      Vector Autoregression is used for understanding the relationship between
      multiple variables over time. It's like watching how different aspects of
      your business influence each other as they change.
    </div>
  ),
  'Support Vector Machine': (
    <div>
      Support Vector Machine is a reliable method for classification and
      prediction, particularly when you need to distinguish between two types of
      outcomes. It's like drawing the best possible line to separate different
      categories of data.
    </div>
  ),
  'Neural Network Autoregression': (
    <div>
      This combines neural network capabilities with time-focused analysis,
      ideal for making predictions about future events based on past trends,
      particularly when those trends have complex patterns.
    </div>
  ),
  'ETS (Error, Trend, Seasonal)': (
    <div>
      ETS models are useful for forecasting by considering errors, trends, and
      seasonal patterns in your data. They help in making educated guesses about
      the future by closely analyzing what happened in the past.
    </div>
  ),
};
