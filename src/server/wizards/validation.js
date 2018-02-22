const {textRange, isImage, oneOf} = require(`../util/assertion`);
const Color = require(`../../data/color`);

const MAX_NAME_LENGTH = 25;
const MIN_NAME_LENGTH = 2;
const requiredColorField = (set) => {
  return {
    required: true,
    assertions: [
      oneOf(set)
    ]
  };
};
const schema = {
  'username': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
    ]
  },
  'avatar': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'coatColor': requiredColorField(Color.COAT),
  'eyeColor': requiredColorField(Color.EYES),
  'fireballColor': requiredColorField(Color.FIREBALL)
};

module.exports = schema;
