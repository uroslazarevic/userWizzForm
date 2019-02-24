<template>
	<div class="form-group">
		<label :for="fieldName">{{label}}</label>
		<input
			:value="value"
			@change="change"
			type="text"
			class="form-control"
			:name="fieldName"
			:placeholder="placeholder"
		>
		<p v-if="fieldValid === false" class="alert alert-danger">{{errorMsg}}</p>
	</div>
</template>

<script>
export default {
	props: [
		"fieldName",
		"label",
		"value",
		"change",
		"errorMsg",
		"placeholder",
		"fieldValid"
	]
};
</script>

<style lang="scss">
.alert {
	padding: 5px;
	margin-top: 10px;
}
</style>