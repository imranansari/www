<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class  extends Vue {
  // props
  // data
  // computed
  // lifecycle
  // watch
  // methods
}
</script>



@Prop({ type: String, default: 'right' }) x!: string;


@Watch('pagination', { deep: true })
