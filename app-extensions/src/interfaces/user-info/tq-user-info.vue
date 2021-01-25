<template>
    <div class="loading" v-if="loading">
		<v-skeleton-loader class="avatar" />
		<div>
			<v-skeleton-loader type="text" />
			<v-skeleton-loader type="text" />
			<v-skeleton-loader type="text" />
		</div>
	</div>
    
	<div class="error" v-else-if="error">
		{{ error }}
	</div>

    <v-card class="user-box" v-else-if="user">
		<v-avatar x-large class="avatar">
			<v-icon name="person" outline x-large />
		</v-avatar>
		<div class="data">
			<div class="name type-title" :style="titleColorStyle">{{ fullName }}</div>
			<div class="status-role" :class="user.status">{{ user.role.name }}</div>
			<div class="email">{{ user.email }}</div>
		</div>
	</v-card>
</template>

<script lang="ts">

import { User, getUserAsync } from './users-service';

export default {
    name: 'TqUserInfo',
    inject: ["system"],
	props: {
		titleColor: {
			type: String,
			default: null,
		},
    }, 
    data() {
        return {
            error: null as string | null,
            loading: false as boolean,
            user: null as User | null,
        }
    },
    computed: {
        fullName: function(): string {
            if(!this.user) return "--";
            return `${this.user.firstName} ${this.user.lastName}`;
		},
		titleColorStyle: function(): any {
			if(!!this.titleColor) return { '--foreground-normal-alt': this.titleColor };
			return {};
		}
    },
    created() {
		const vm = this;

		function loadData() {
			vm.loading = true;
			//@ts-ignore
            getUserAsync(vm.system.api).then((user: User) => {
                vm.user = user;
            }).catch(err => {
                vm.error = err.message;
            }).finally(() => {
                vm.loading = false;
            });
		}
		
        loadData();
    }
};

</script>

<style lang="scss" scoped>
.component {
	color: var(--primary);
}

.user-box {
	display: flex;
	padding: 8px 4px;

	.v-avatar {
		margin-right: 16px;
	}

	.status-role {
		&.invited {
			color: var(--primary);
		}
		&.active {
			color: var(--success);
		}
		&.suspended {
			color: var(--warning);
		}
		&.deleted {
			color: var(--danger);
		}
	}

	.email {
		color: var(--foreground-subdued);
	}
}

.loading {
	--v-skeleton-loader-background-color: var(--background-normal);

	display: flex;
	align-items: center;
	margin: 8px 4px;

	.avatar {
		width: 80px;
		height: 80px;
		margin-right: 16px;
	}
}
</style>