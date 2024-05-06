import Vue from 'vue'

const removeNode = (instance, delay = 500) => {
	if (instance.visible) instance.visible = false;
	setTimeout(() => {
		instance.$el?.parentNode?.removeChild(instance.$el)
	}, delay);
};
const isObject = (v) => Object.prototype.toString.call(v) === '[object Object]';

class Portal {
	constructor(dialog) {
		this.dialog = dialog;
	}
	render(props = {}) {
		if (!this.dialog) return;
		const constructor = Vue.extend(this.dialog);
		const instance = new constructor();
		const functions = {};

		instance.$on('hook:beforeMount', () => {
			if (isObject(props)) {
				for (const key of Object.keys(props)) {
					instance[key] = props[key];
				}
			}
		});

		instance.$on('hook:mounted', () => {
			instance.visible = true;
		});

		instance.$on('ok', (...p) => {
			const ok = functions?.ok;
			if (ok) {
				ok(...p)
			} else {
				removeNode(instance)
			}
		});

		instance.$on('close', (...p) => {
			functions?.close?.(...p)
			removeNode(instance)
		});

		instance.$on('cancel', (...p) => {
			functions?.cancel?.(...p)
			removeNode(instance)
		});

		instance.$mount();
		document.body.appendChild(instance.$el);

		const result = {
			openOkLoading() {
				instance.loading = true;
			},
			closeOkLoading() {
				instance.loading = false;
			},
			ok(v) {
				functions.ok = v
				return this
			},
			close(v) {
				if (!v) {
					instance.loading = false;
					removeNode(instance)
				}
				functions.close = v
				return this
			},
			cancel(v) {
				functions.cancel = v
				return this
			}
		}
		return result
	}
}

export default Portal