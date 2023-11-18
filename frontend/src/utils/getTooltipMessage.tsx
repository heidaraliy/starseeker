import { modelTypeTooltips } from '../consts/modelTypeTooltips';
import { packageTooltips, placeholderText } from '../consts/packageTooltips';
import { languageTooltips } from '../consts/languageTooltips';

export const getTooltipMessage = (option: string, type: string): string => {
  let tooltipContent;

  switch (type) {
    case 'languageType':
      tooltipContent = languageTooltips[option];
      break;
    case 'modelType':
      tooltipContent = modelTypeTooltips[option];
      break;
    case 'package':
      tooltipContent = packageTooltips[option];
      break;
    default:
      tooltipContent = placeholderText;
  }

  return tooltipContent ? tooltipContent : '';
};
