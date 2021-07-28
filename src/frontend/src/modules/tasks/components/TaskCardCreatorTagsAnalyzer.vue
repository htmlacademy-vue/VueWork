<script>
import { uniq } from 'lodash';
import { TAG_SEPARATOR, KEY_CODE_ENTER } from '@/common/constants';
import { getTagsArrayFromString } from '@/common/helpers';

export default {
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      splitTags: this.tags ? getTagsArrayFromString(this.tags) : []
    };
  },
  watch: {
    async tags(value) {
      this.splitTags = getTagsArrayFromString(value);
    }
  },
  methods: {
    async updateTags(tags) {
      this.$emit('setTags', tags.trim(), true);
      this.$refs.analyzer.blur();
    }
  },
  render(createElement) {
    const elements = this.splitTags.map(tag => {
      return createElement(
        'span',
        {
          class: { tag: true }
        },
        `${TAG_SEPARATOR}${tag}`
      );
    });

    const updateTags = event => {
      // Note: remove duplicates
      const uniqValues = uniq(
        event.target.textContent
          .split(TAG_SEPARATOR)
      );
      this.updateTags(uniqValues.join(TAG_SEPARATOR));
    };

    return createElement(
      'div',
      {
        attrs: { contentEditable: true },
        class: {
          analyzer: true
        },
        style: {
          outline: 'none',
          minHeight: '42px'
        },
        on: {
          focus: () => {
            this.$emit('setTags', `${this.tags}#`, false);
          },
          blur: event => updateTags(event),
          keydown: event => {
            if (event.keyCode === KEY_CODE_ENTER) {
              event.preventDefault();
              updateTags(event);
            }
          }
        },
        ref: 'analyzer'
      },
      elements
    );
  }
};
</script>

<style lang="scss" scoped>
.tag,
.analyzer::v-deep font {
  display: inline-flex;

  margin: 2px;
  padding: 4px 8px;

  color: $gray-900;
  border-radius: 10px;
  background-color: $blue-gray-100;

  @include r-s10-h12;
}
</style>
