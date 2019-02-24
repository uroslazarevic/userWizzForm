<template>
	<div class="tab">
		<form-field
			:fieldName="formFieldsName.firstName"
			:value="formInputsValue.firstName"
			label="First name"
			placeholder="Enter first name"
			:change="handleFormInput"
			:errorMsg="formFieldsErrors.firstName"
			:fieldValid="formFieldsValid.firstNameValid"
		/>
		<form-field
			:fieldName="formFieldsName.lastName"
			:value="formInputsValue.lastName"
			label="Last name"
			placeholder="Enter last name"
			:change="handleFormInput"
			:errorMsg="formFieldsErrors.lastName"
			:fieldValid="formFieldsValid.lastNameValid"
		/>
		<form-field
			:fieldName="formFieldsName.email"
			:value="formInputsValue.email"
			label="Email address"
			placeholder="Enter email"
			:change="handleFormInput"
			:errorMsg="formFieldsErrors.email"
			:fieldValid="formFieldsValid.emailValid"
		/>
		<form-field
			:fieldName="formFieldsName.username"
			:value="formInputsValue.username"
			label="Username"
			placeholder="Enter username"
			:change="handleFormInput"
			:errorMsg="formFieldsErrors.username"
			:fieldValid="formFieldsValid.usernameValid"
		/>
		<form-field
			:fieldName="formFieldsName.password"
			:value="formInputsValue.password"
			label="Password"
			placeholder="Enter password"
			:change="handleFormInput"
			:errorMsg="formFieldsErrors.password"
			:fieldValid="formFieldsValid.passwordValid"
		/>
	</div>
</template>

<script>
import FormField from "./FormField";

export default {
	props: [
		"formInputsValue",
		"formFieldsName",
		"handleFormInput",
		"formFieldsValid",
		"formFieldsErrors"
	],
	methods: {},
	components: {
		formField: FormField
	}
};
</script>

<style >
</style>