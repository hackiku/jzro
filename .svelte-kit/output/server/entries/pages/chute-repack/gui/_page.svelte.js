import { c as create_ssr_component, b as compute_rest_props, d as spread, h as escape_attribute_value, f as escape_object, i as add_attribute, e as escape, v as validate_component, p as each } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/index2.js";
import { b as cn } from "../../../../chunks/utils.js";
import { C as Card } from "../../../../chunks/card.js";
import "clsx";
import { i as is_void } from "../../../../chunks/names.js";
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6 pb-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("text-lg font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  return `<input${spread(
    [
      {
        class: escape_attribute_value(cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  return `<textarea${spread(
    [
      {
        class: escape_attribute_value(cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(value || "")}</textarea>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let url = "";
  let html = "";
  let css = "";
  let analysisResult = "";
  let improvedVersion = "";
  let websites = [];
  let masterPrompt = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  <div class="min-h-screen bg-gray-900 text-white p-8"><h1 class="text-3xl font-bold mb-8" data-svelte-h="svelte-a0mel1">Chute Repack GUI</h1> ${validate_component(Card, "Card").$$render($$result, { class: "mb-8 bg-gray-800" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Master Prompt`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Textarea, "Textarea").$$render(
              $$result,
              { class: "mb-4", value: masterPrompt },
              {
                value: ($$value) => {
                  masterPrompt = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Update Master Prompt`;
              }
            })}`;
          }
        })}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { class: "mb-8 bg-gray-800" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Website Analysis`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Input, "Input").$$render(
              $$result,
              {
                placeholder: "Enter website URL",
                class: "mb-4",
                value: url
              },
              {
                value: ($$value) => {
                  url = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                placeholder: "Paste raw HTML here",
                class: "mb-4",
                value: html
              },
              {
                value: ($$value) => {
                  html = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                placeholder: "Paste raw CSS here",
                class: "mb-4",
                value: css
              },
              {
                value: ($$value) => {
                  css = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Button, "Button").$$render($$result, { class: "mr-2" }, {}, {
              default: () => {
                return `Analyze`;
              }
            })} ${validate_component(Button, "Button").$$render($$result, { class: "mr-2" }, {}, {
              default: () => {
                return `Improve`;
              }
            })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Save`;
              }
            })}`;
          }
        })}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { class: "mb-8 bg-gray-800" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Image Upload`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "file",
                multiple: true,
                accept: "image/*"
              },
              {},
              {}
            )}`;
          }
        })}`;
      }
    })} <div class="grid grid-cols-2 gap-8">${validate_component(Card, "Card").$$render($$result, { class: "bg-gray-800" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Analysis Result`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `<pre class="bg-gray-700 p-4 rounded">${escape(analysisResult)}</pre> ${validate_component(Button, "Button").$$render($$result, { class: "mt-4" }, {}, {
              default: () => {
                return `Copy to Clipboard`;
              }
            })}`;
          }
        })}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { class: "bg-gray-800" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Improved Version`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `<pre class="bg-gray-700 p-4 rounded">${escape(improvedVersion)}</pre> ${validate_component(Button, "Button").$$render($$result, { class: "mt-4" }, {}, {
              default: () => {
                return `Copy to Clipboard`;
              }
            })}`;
          }
        })}`;
      }
    })}</div> ${validate_component(Card, "Card").$$render($$result, { class: "mt-8 bg-gray-800" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "CardHeader").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "CardTitle").$$render($$result, {}, {}, {
              default: () => {
                return `Saved Websites`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "CardContent").$$render($$result, {}, {}, {
          default: () => {
            return `<ul>${each(websites, (website) => {
              return `<li>${escape(website.url)}</li>`;
            })}</ul>`;
          }
        })}`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
