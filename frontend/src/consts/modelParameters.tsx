type ModelParameterFunction = () => JSX.Element;

interface ModelParameters {
  [key: string]: ModelParameterFunction;
}

export const modelParameters: ModelParameters = {
  XGBoost: () => (
    <div className="flex flex-col">
      <label
        htmlFor="col_sample_by_tree"
        className="font-heebo font-light text-sm my-1"
      >
        Column Sample (By Tree):
      </label>
      <input
        type="number"
        id="col_sample_by_tree"
        name="col_sample_by_tree"
        step="any"
        className="border-2 border-black focus:border-indigo-950 h-6"
      />
    </div>
  ),
};
