<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<h1 class="text-center">User Wizard Form</h1>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<form>
					<transition name="fade" mode="out-in">
						<component
							:is="mode"
							:handleFormInput="handleFormInput"
							:formInputsValue="formInputsValue"
							:formFieldsName="formFieldsName"
							:formFieldsValid="formFieldsValid"
							:formFieldsErrors="formFieldsErrors"
							:addUserTags="addUserTags"
						></component>
					</transition>
				</form>
				<div class="navigate-btns">
					<button v-if="showTab === 'back'" @click="prevNext(-1)" class="btn btn-danger back">Back</button>
					<button
						v-if="showTab === 'back'"
						:disabled="formInputsValue.tags <= 0"
						class="btn btn-success submit-form"
						@click="submitUserForm"
					>Submit</button>
					<button :disabled="!formValid" v-else @click="prevNext(1)" class="btn btn-success next">Next</button>
				</div>

				<h2>Created users:</h2>
				<ul class="list-group">
					<li
						class="list-group-item"
						v-for="(user, index) in users"
						:key="index"
					>{{user.firstName}} {{ user.lastName }} - {{user.email}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BasicInfo from "./components/BasicInfo.vue";
import FormTags from "./components/FormTags";

const tabs = {
	0: "user-basic-info",
	1: "user-form-tags"
};
let currentTab = 0;

export default {
	data() {
		return {
			mode: tabs[currentTab],
			users: "",
			tabs,
			currentTab,
			showTab: "next",
			formValid: false,
			formInputsValue: {
				firstName: "asd",
				lastName: "",
				email: "",
				username: "",
				password: "",
				tag: "",
				tags: []
			},
			formFieldsName: {
				firstName: "firstName",
				lastName: "lastName",
				email: "email",
				username: "username",
				password: "password"
			},
			formFieldsValid: {
				firstNameValid: "",
				lastNameValid: "",
				emailValid: "",
				usernameValid: "",
				passwordValid: ""
			},
			formFieldsErrors: {
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: ""
			}
		};
	},
	created() {
		this.users = this.$store.getters.getUsers;
	},
	methods: {
		prevNext(n) {
			this.currentTab += n;
			this.currentTab == 0 ? (this.showTab = "next") : (this.showTab = "back");
			this.mode = this.tabs[this.currentTab];
		},
		validateFormField(fieldName, value) {
			let {
				formFieldsErrors,
				formFieldsValid: {
					firstNameValid,
					lastNameValid,
					emailValid,
					usernameValid,
					passwordValid
				},
				formValid
			} = this;

			switch (fieldName) {
				case "firstName":
					firstNameValid = value !== "";
					firstNameValid
						? (formFieldsErrors[fieldName] = "")
						: (formFieldsErrors[fieldName] = "Please provide valid first name");
					break;
				case "lastName":
					lastNameValid = value !== "";
					lastNameValid
						? (formFieldsErrors[fieldName] = "")
						: (formFieldsErrors[fieldName] = "Please provide valid last name");
					break;
				case "email":
					emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
					emailValid
						? (formFieldsErrors[fieldName] = "")
						: (formFieldsErrors[fieldName] = "Please provide valid email");
					break;
				case "username":
					usernameValid = value !== "";
					usernameValid
						? (formFieldsErrors[fieldName] = "")
						: (formFieldsErrors[fieldName] = "Please provide valid username");
					break;
				case "password":
					passwordValid = value.length >= 6;
					passwordValid
						? (formFieldsErrors[fieldName] = "")
						: (formFieldsErrors[fieldName] =
								"Password must be at least 6 characters long");
					break;
			}

			if (
				firstNameValid &&
				lastNameValid &&
				emailValid &&
				usernameValid &&
				passwordValid
			) {
				formValid = true;
			} else {
				formValid = false;
			}

			this.formFieldsErrors = formFieldsErrors;
			this.formFieldsValid = {
				firstNameValid,
				lastNameValid,
				emailValid,
				usernameValid,
				passwordValid
			};
			this.formValid = formValid;
		},
		handleFormInput(event) {
			const { name, value } = event.target;

			this.formInputsValue[name] = value;
			this.validateFormField(name, value);
		},
		addUserTags() {
			this.formInputsValue.tags.push(this.formInputsValue.tag);
			this.formInputsValue.tag = "";
		},
		submitUserForm() {
			const formData = { ...this.formInputsValue };
			delete formData["tag"];

			this.$store.dispatch("submitForm", formData);
			this.resetForm();
		},
		resetForm() {
			this.formInputsValue = {
				firstName: "asd",
				lastName: "",
				email: "",
				username: "",
				password: "",
				tag: "",
				tags: []
			};
			this.formFieldsName = {
				firstName: "firstName",
				lastName: "lastName",
				email: "email",
				username: "username",
				password: "password"
			};
			this.formFieldsValid = {
				firstNameValid: "",
				lastNameValid: "",
				emailValid: "",
				usernameValid: "",
				passwordValid: ""
			};
			this.formFieldsErrors = {
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: ""
			};
			(this.showTab = "next"), (this.currentTab = 0);
			this.mode = this.tabs[this.currentTab];
			this.formValid = false;
		}
	},
	components: {
		[tabs[0]]: BasicInfo,
		[tabs[1]]: FormTags
	}
};
</script>

<style lang="scss" >
h2 {
	margin-bottom: 20px;
}
.navigate-btns {
	margin-top: 50px;
	display: flex;

	.next,
	.submit-form {
		margin-left: auto;
	}
}

.fade-enter {
	opacity: 0;
}

.fade-enter-active {
	transition: opacity 0.4s;
	/* opacity: 1; je default so I dont have to set it */
}

.fade-leave {
	/* opacity: 1; je default so I dont have to set it */
}

.fade-leave-active {
	transition: opacity 0.4s;
	opacity: 0;
}
</style>

