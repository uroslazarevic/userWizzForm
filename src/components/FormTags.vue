<template>
	<div class="tab">
		<div class="form-group">
			<label for="tag">Create user tag</label>
			<input
				:value="formInputsValue.tag"
				@change="handleFormInput"
				type="text"
				class="form-control"
				name="tag"
				placeholder="Add a tag"
			>
			<button @click.prevent="addUserTags" class="btn btn-success add-tag">Add a tag</button>
		</div>

		<ul class="user-tags list-group">
			<li
				class="user-tag list-group-item"
				v-for="(tag, index) in formInputsValue.tags"
				:key="index"
			>{{tag}} - {{(index)}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ["handleFormInput", "addUserTags", "formInputsValue"]
};
</script>

<style lang="scss" scope>
.add-tag {
	margin-top: 10px;
}

.user-tags {
	padding: 0px;

	li {
		list-style: none;
		margin-bottom: 5px;

		&:last-child {
			margin: none;
		}
	}
}
</style>