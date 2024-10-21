import { s as setContext, g as getContext, c as create_ssr_component, b as compute_rest_props, a as subscribe, d as spread, f as escape_object, i as add_attribute, v as validate_component, o as onDestroy, k as get_current_component, l as is_promise, n as noop, m as missing_component, p as each, e as escape } from "../../chunks/ssr.js";
import { I as Icon, N as Nav } from "../../chunks/Nav.js";
import { w as writable, d as derived, r as readable } from "../../chunks/index.js";
import * as THREE from "three";
import { PerspectiveCamera, Scene as Scene$1, REVISION, ColorManagement, PCFSoftShadowMap, WebGLRenderer, ACESFilmicToneMapping, Vector3, ShaderMaterial, OrthographicCamera, MeshBasicMaterial, WebGLRenderTarget, PlaneGeometry, Mesh, MeshDepthMaterial, Color, Plane, DoubleSide, Matrix4, ShaderChunk, Group, BufferGeometry, Float32BufferAttribute, LineBasicMaterial } from "three";
import { g as generateIds, e as effect, t as tick } from "../../chunks/effect.js";
import mitt from "mitt";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader.js";
import { OrbitControls as OrbitControls$1 } from "three/examples/jsm/controls/OrbitControls.js";
import { shaderStructs, shaderIntersectFunction } from "three-mesh-bvh";
import "@threejs-kit/instanced-sprite-mesh";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import "dequal";
import { o as omit, w as withGet, m as makeElement, d as disabledAttr, s as styleToString, f as makeElementArray, i as isBrowser, e as executeCallbacks, g as addEventListener, c as createElHelpers, h as getElementByMeltId, j as isHTMLElement, a as addMeltEventListener, k as kbd, b as cn } from "../../chunks/utils.js";
import { t as toWritableStores, o as overridable, c as createBitAttrs, r as removeUndefined, g as getOptionUpdater, a as createDispatcher } from "../../chunks/updater.js";
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
const defaults = {
  defaultValue: [],
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
};
const { name } = createElHelpers("slider");
const createSlider = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { min, max, step, orientation, dir, disabled } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isActive = withGet(writable(false));
  const currentThumbIndex = withGet(writable(0));
  const activeThumb = withGet(writable(null));
  const meltIds = generateIds(["root"]);
  const updatePosition = (val, index) => {
    value.update((prev) => {
      if (!prev)
        return [val];
      if (prev[index] === val)
        return prev;
      const newValue = [...prev];
      const direction2 = newValue[index] > val ? -1 : 1;
      function swap() {
        newValue[index] = newValue[index + direction2];
        newValue[index + direction2] = val;
        const thumbs2 = getAllThumbs();
        if (thumbs2) {
          thumbs2[index + direction2].focus();
          activeThumb.set({ thumb: thumbs2[index + direction2], index: index + direction2 });
        }
      }
      if (direction2 === -1 && val < newValue[index - 1]) {
        swap();
        return newValue;
      } else if (direction2 === 1 && val > newValue[index + 1]) {
        swap();
        return newValue;
      }
      const $min = min.get();
      const $max = max.get();
      const $step = step.get();
      newValue[index] = snapValueToStep(val, $min, $max, $step);
      return newValue;
    });
  };
  const getAllThumbs = () => {
    const root2 = getElementByMeltId(meltIds.root);
    if (!root2)
      return null;
    return Array.from(root2.querySelectorAll('[data-melt-part="thumb"]')).filter((thumb) => isHTMLElement(thumb));
  };
  const position = derived([min, max], ([$min, $max]) => {
    return (val) => {
      const pos = (val - $min) / ($max - $min) * 100;
      return pos;
    };
  });
  const direction = withGet.derived([orientation, dir], ([$orientation, $dir]) => {
    if ($orientation === "horizontal") {
      return $dir === "rtl" ? "rl" : "lr";
    } else {
      return $dir === "rtl" ? "tb" : "bt";
    }
  });
  const root = makeElement(name(), {
    stores: [disabled, orientation, dir],
    returned: ([$disabled, $orientation, $dir]) => {
      return {
        dir: $dir,
        disabled: disabledAttr($disabled),
        "data-disabled": disabledAttr($disabled),
        "data-orientation": $orientation,
        style: $disabled ? void 0 : `touch-action: ${$orientation === "horizontal" ? "pan-y" : "pan-x"}`,
        "data-melt-id": meltIds.root
      };
    }
  });
  const range = makeElement(name("range"), {
    stores: [value, direction, position],
    returned: ([$value, $direction, $position]) => {
      const minimum = $value.length > 1 ? $position(Math.min(...$value) ?? 0) : 0;
      const maximum = 100 - $position(Math.max(...$value) ?? 0);
      const style = {
        position: "absolute"
      };
      switch ($direction) {
        case "lr": {
          style.left = `${minimum}%`;
          style.right = `${maximum}%`;
          break;
        }
        case "rl": {
          style.right = `${minimum}%`;
          style.left = `${maximum}%`;
          break;
        }
        case "bt": {
          style.bottom = `${minimum}%`;
          style.top = `${maximum}%`;
          break;
        }
        case "tb": {
          style.top = `${minimum}%`;
          style.bottom = `${maximum}%`;
          break;
        }
      }
      return {
        style: styleToString(style)
      };
    }
  });
  const thumbs = makeElementArray(name("thumb"), {
    stores: [value, position, min, max, disabled, orientation, direction],
    returned: ([$value, $position, $min, $max, $disabled, $orientation, $direction]) => {
      const result = Array.from({ length: $value.length || 1 }, (_, i) => {
        const currentThumb = currentThumbIndex.get();
        if (currentThumb < $value.length) {
          currentThumbIndex.update((prev) => prev + 1);
        }
        const thumbValue = $value[i];
        const thumbPosition = `${$position(thumbValue)}%`;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = thumbPosition;
            style.translate = "-50% 0";
            break;
          }
          case "rl": {
            style.right = thumbPosition;
            style.translate = "50% 0";
            break;
          }
          case "bt": {
            style.bottom = thumbPosition;
            style.translate = "0 50%";
            break;
          }
          case "tb": {
            style.top = thumbPosition;
            style.translate = "0 -50%";
            break;
          }
        }
        return {
          role: "slider",
          "aria-valuemin": $min,
          "aria-valuemax": $max,
          "aria-valuenow": thumbValue,
          "aria-disabled": disabledAttr($disabled),
          "aria-orientation": $orientation,
          "data-melt-part": "thumb",
          "data-value": thumbValue,
          style: styleToString(style),
          tabindex: $disabled ? -1 : 0
        };
      });
      return result;
    },
    action: (node) => {
      const unsub = addMeltEventListener(node, "keydown", (event) => {
        if (disabled.get())
          return;
        const target = event.currentTarget;
        if (!isHTMLElement(target))
          return;
        const thumbs2 = getAllThumbs();
        if (!thumbs2?.length)
          return;
        const index = thumbs2.indexOf(target);
        currentThumbIndex.set(index);
        if (![
          kbd.ARROW_LEFT,
          kbd.ARROW_RIGHT,
          kbd.ARROW_UP,
          kbd.ARROW_DOWN,
          kbd.HOME,
          kbd.END
        ].includes(event.key)) {
          return;
        }
        event.preventDefault();
        const $min = min.get();
        const $max = max.get();
        const $step = step.get();
        const $value = value.get();
        const $orientation = orientation.get();
        const $direction = direction.get();
        const thumbValue = $value[index];
        switch (event.key) {
          case kbd.HOME: {
            updatePosition($min, index);
            break;
          }
          case kbd.END: {
            updatePosition($max, index);
            break;
          }
          case kbd.ARROW_LEFT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction === "lr" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
          case kbd.ARROW_RIGHT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction === "lr" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_UP: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction !== "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_DOWN: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction !== "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
        }
      });
      return {
        destroy: unsub
      };
    }
  });
  const ticks = makeElementArray(name("tick"), {
    stores: [value, min, max, step, direction],
    returned: ([$value, $min, $max, $step, $direction]) => {
      const difference = $max - $min;
      let count = Math.ceil(difference / $step);
      if (difference % $step == 0) {
        count++;
      }
      return Array.from({ length: count }, (_, i) => {
        const tickPosition = `${i * ($step / ($max - $min)) * 100}%`;
        const isFirst = i === 0;
        const isLast = i === count - 1;
        const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = tickPosition;
            style.translate = `${offsetPercentage}% 0`;
            break;
          }
          case "rl": {
            style.right = tickPosition;
            style.translate = `${-offsetPercentage}% 0`;
            break;
          }
          case "bt": {
            style.bottom = tickPosition;
            style.translate = `0 ${-offsetPercentage}%`;
            break;
          }
          case "tb": {
            style.top = tickPosition;
            style.translate = `0 ${offsetPercentage}%`;
            break;
          }
        }
        const tickValue = $min + i * $step;
        const bounded = $value.length === 1 ? tickValue <= $value[0] : $value[0] <= tickValue && tickValue <= $value[$value.length - 1];
        return {
          "data-bounded": bounded ? true : void 0,
          "data-value": tickValue,
          style: styleToString(style)
        };
      });
    }
  });
  effect([root, min, max, disabled, orientation, direction, step], ([$root, $min, $max, $disabled, $orientation, $direction, $step]) => {
    if (!isBrowser || $disabled)
      return;
    const applyPosition = (clientXY, activeThumbIdx, start, end) => {
      const percent = (clientXY - start) / (end - start);
      const val = percent * ($max - $min) + $min;
      if (val < $min) {
        updatePosition($min, activeThumbIdx);
      } else if (val > $max) {
        updatePosition($max, activeThumbIdx);
      } else {
        const step2 = $step;
        const min2 = $min;
        const currentStep = Math.floor((val - min2) / step2);
        const midpointOfCurrentStep = min2 + currentStep * step2 + step2 / 2;
        const midpointOfNextStep = min2 + (currentStep + 1) * step2 + step2 / 2;
        const newValue = val >= midpointOfCurrentStep && val < midpointOfNextStep ? (currentStep + 1) * step2 + min2 : currentStep * step2 + min2;
        if (newValue <= $max) {
          updatePosition(newValue, activeThumbIdx);
        }
      }
    };
    const getClosestThumb = (e) => {
      const thumbs2 = getAllThumbs();
      if (!thumbs2)
        return;
      thumbs2.forEach((thumb2) => thumb2.blur());
      const distances = thumbs2.map((thumb2) => {
        if ($orientation === "horizontal") {
          const { left, right } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientX - (left + right) / 2);
        } else {
          const { top, bottom } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientY - (top + bottom) / 2);
        }
      });
      const thumb = thumbs2[distances.indexOf(Math.min(...distances))];
      const index = thumbs2.indexOf(thumb);
      return { thumb, index };
    };
    const pointerMove = (e) => {
      if (!isActive.get())
        return;
      e.preventDefault();
      e.stopPropagation();
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = activeThumb.get();
      if (!sliderEl || !closestThumb)
        return;
      closestThumb.thumb.focus();
      const { left, right, top, bottom } = sliderEl.getBoundingClientRect();
      switch ($direction) {
        case "lr": {
          applyPosition(e.clientX, closestThumb.index, left, right);
          break;
        }
        case "rl": {
          applyPosition(e.clientX, closestThumb.index, right, left);
          break;
        }
        case "bt": {
          applyPosition(e.clientY, closestThumb.index, bottom, top);
          break;
        }
        case "tb": {
          applyPosition(e.clientY, closestThumb.index, top, bottom);
          break;
        }
      }
    };
    const pointerDown = (e) => {
      if (e.button !== 0)
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = getClosestThumb(e);
      if (!closestThumb || !sliderEl)
        return;
      const target = e.target;
      if (!isHTMLElement(target) || !sliderEl.contains(target)) {
        return;
      }
      e.preventDefault();
      activeThumb.set(closestThumb);
      closestThumb.thumb.focus();
      isActive.set(true);
      pointerMove(e);
    };
    const pointerUp = () => {
      isActive.set(false);
    };
    const unsub = executeCallbacks(addEventListener(document, "pointerdown", pointerDown), addEventListener(document, "pointerup", pointerUp), addEventListener(document, "pointerleave", pointerUp), addEventListener(document, "pointermove", pointerMove));
    return () => {
      unsub();
    };
  });
  effect([step, min, max, value], function fixValue([$step, $min, $max, $value]) {
    const isValidValue = (v) => {
      const snappedValue = snapValueToStep(v, $min, $max, $step);
      return snappedValue === v;
    };
    const gcv = (v) => {
      return snapValueToStep(v, $min, $max, $step);
    };
    if ($value.some((v) => !isValidValue(v))) {
      value.update((prev) => {
        return prev.map(gcv);
      });
    }
  });
  return {
    elements: {
      root,
      thumbs,
      range,
      ticks
    },
    states: {
      value
    },
    options
  };
};
function getSliderData() {
  const NAME = "slider";
  const PARTS = ["root", "input", "range", "thumb", "tick"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSliderData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const slider = { ...createSlider(removeUndefined(props)), getAttrs };
  setContext(NAME, slider);
  return {
    ...slider,
    updateOption: getOptionUpdater(slider.options)
  };
}
function getCtx() {
  const { NAME } = getSliderData();
  return getContext(NAME);
}
const Slider$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "disabled",
    "min",
    "max",
    "step",
    "orientation",
    "dir",
    "value",
    "onValueChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let $ticks, $$unsubscribe_ticks;
  let $thumbs, $$unsubscribe_thumbs;
  let { disabled = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { max = void 0 } = $$props;
  let { step = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root, ticks, thumbs }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    disabled,
    dir,
    min,
    max,
    step,
    orientation,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_ticks = subscribe(ticks, (value2) => $ticks = value2);
  $$unsubscribe_thumbs = subscribe(thumbs, (value2) => $thumbs = value2);
  const attrs = getAttrs("root");
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("min", min);
  }
  {
    updateOption("max", max);
  }
  {
    updateOption("step", step);
  }
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("dir", dir);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  $$unsubscribe_ticks();
  $$unsubscribe_thumbs();
  return `${asChild ? `${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}</span>`}`;
});
const Slider_range = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $range, $$unsubscribe_range;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { range }, getAttrs } = getCtx();
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  const attrs = getAttrs("range");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $range;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_range();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Slider_thumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el", "thumb"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  let { thumb } = $$props;
  const { getAttrs } = getCtx();
  createDispatcher();
  const attrs = getAttrs("thumb");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.thumb === void 0 && $$bindings.thumb && thumb !== void 0) $$bindings.thumb(thumb);
  builder = thumb;
  {
    Object.assign(builder, attrs);
  }
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Pause = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "x": "14",
        "y": "4",
        "width": "4",
        "height": "16",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "x": "6",
        "y": "4",
        "width": "4",
        "height": "16",
        "rx": "1"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pause" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["polygon", { "points": "6 3 20 12 6 21 6 3" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "play" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Rotate_ccw = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    ["path", { "d": "M3 3v5h5" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "rotate-ccw" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
class DAG {
  allVertices = {};
  /** Nodes that are fully unlinked */
  isolatedVertices = {};
  connectedVertices = {};
  sortedConnectedValues = [];
  needsSort = false;
  emitter = mitt();
  emit = this.emitter.emit.bind(this.emitter);
  on = this.emitter.on.bind(this.emitter);
  off = this.emitter.off.bind(this.emitter);
  get sortedVertices() {
    return this.mapNodes((value) => value);
  }
  moveToIsolated(key2) {
    const vertex = this.connectedVertices[key2];
    if (!vertex)
      return;
    this.isolatedVertices[key2] = vertex;
    delete this.connectedVertices[key2];
  }
  moveToConnected(key2) {
    const vertex = this.isolatedVertices[key2];
    if (!vertex)
      return;
    this.connectedVertices[key2] = vertex;
    delete this.isolatedVertices[key2];
  }
  getKey = (v) => {
    if (typeof v === "object") {
      return v.key;
    }
    return v;
  };
  add(key2, value, options) {
    if (this.allVertices[key2] && this.allVertices[key2].value !== void 0) {
      throw new Error(`A node with the key ${key2.toString()} already exists`);
    }
    let vertex = this.allVertices[key2];
    if (!vertex) {
      vertex = {
        value,
        previous: /* @__PURE__ */ new Set(),
        next: /* @__PURE__ */ new Set()
      };
      this.allVertices[key2] = vertex;
    } else if (vertex.value === void 0) {
      vertex.value = value;
    }
    const hasEdges = vertex.next.size > 0 || vertex.previous.size > 0;
    if (!options?.after && !options?.before && !hasEdges) {
      this.isolatedVertices[key2] = vertex;
      this.emit("node:added", {
        key: key2,
        type: "isolated",
        value
      });
      return;
    } else {
      this.connectedVertices[key2] = vertex;
    }
    if (options?.after) {
      const afterArr = Array.isArray(options.after) ? options.after : [options.after];
      afterArr.forEach((after) => {
        vertex.previous.add(this.getKey(after));
      });
      afterArr.forEach((after) => {
        const afterKey = this.getKey(after);
        const linkedAfter = this.allVertices[afterKey];
        if (!linkedAfter) {
          this.allVertices[afterKey] = {
            value: void 0,
            previous: /* @__PURE__ */ new Set(),
            next: /* @__PURE__ */ new Set([key2])
          };
          this.connectedVertices[afterKey] = this.allVertices[afterKey];
        } else {
          linkedAfter.next.add(key2);
          this.moveToConnected(afterKey);
        }
      });
    }
    if (options?.before) {
      const beforeArr = Array.isArray(options.before) ? options.before : [options.before];
      beforeArr.forEach((before) => {
        vertex.next.add(this.getKey(before));
      });
      beforeArr.forEach((before) => {
        const beforeKey = this.getKey(before);
        const linkedBefore = this.allVertices[beforeKey];
        if (!linkedBefore) {
          this.allVertices[beforeKey] = {
            value: void 0,
            previous: /* @__PURE__ */ new Set([key2]),
            next: /* @__PURE__ */ new Set()
          };
          this.connectedVertices[beforeKey] = this.allVertices[beforeKey];
        } else {
          linkedBefore.previous.add(key2);
          this.moveToConnected(beforeKey);
        }
      });
    }
    this.emit("node:added", {
      key: key2,
      type: "connected",
      value
    });
    this.needsSort = true;
  }
  remove(key2) {
    const removeKey = this.getKey(key2);
    const unlinkedVertex = this.isolatedVertices[removeKey];
    if (unlinkedVertex) {
      delete this.isolatedVertices[removeKey];
      delete this.allVertices[removeKey];
      this.emit("node:removed", {
        key: removeKey,
        type: "isolated"
      });
      return;
    }
    const linkedVertex = this.connectedVertices[removeKey];
    if (!linkedVertex) {
      return;
    }
    linkedVertex.next.forEach((nextKey) => {
      const nextVertex = this.connectedVertices[nextKey];
      if (nextVertex) {
        nextVertex.previous.delete(removeKey);
        if (nextVertex.previous.size === 0 && nextVertex.next.size === 0) {
          this.moveToIsolated(nextKey);
        }
      }
    });
    linkedVertex.previous.forEach((prevKey) => {
      const prevVertex = this.connectedVertices[prevKey];
      if (prevVertex) {
        prevVertex.next.delete(removeKey);
        if (prevVertex.previous.size === 0 && prevVertex.next.size === 0) {
          this.moveToIsolated(prevKey);
        }
      }
    });
    delete this.connectedVertices[removeKey];
    delete this.allVertices[removeKey];
    this.emit("node:removed", {
      key: removeKey,
      type: "connected"
    });
    this.needsSort = true;
  }
  mapNodes(callback) {
    if (this.needsSort) {
      this.sort();
    }
    const result = [];
    this.forEachNode((value, index) => {
      result.push(callback(value, index));
    });
    return result;
  }
  forEachNode(callback) {
    if (this.needsSort) {
      this.sort();
    }
    let index = 0;
    for (; index < this.sortedConnectedValues.length; index++) {
      callback(this.sortedConnectedValues[index], index);
    }
    Reflect.ownKeys(this.isolatedVertices).forEach((key2) => {
      const vertex = this.isolatedVertices[key2];
      if (vertex.value !== void 0)
        callback(vertex.value, index++);
    });
  }
  getValueByKey(key2) {
    return this.allVertices[key2]?.value;
  }
  getKeyByValue(value) {
    return Reflect.ownKeys(this.connectedVertices).find((key2) => this.connectedVertices[key2].value === value) ?? Reflect.ownKeys(this.isolatedVertices).find((key2) => this.isolatedVertices[key2].value === value);
  }
  sort() {
    const inDegree = /* @__PURE__ */ new Map();
    const zeroInDegreeQueue = [];
    const result = [];
    const connectedVertexKeysWithValues = Reflect.ownKeys(this.connectedVertices).filter((key2) => {
      const vertex = this.connectedVertices[key2];
      return vertex.value !== void 0;
    });
    connectedVertexKeysWithValues.forEach((vertex) => {
      inDegree.set(vertex, 0);
    });
    connectedVertexKeysWithValues.forEach((vertexKey) => {
      const vertex = this.connectedVertices[vertexKey];
      vertex.next.forEach((next) => {
        const nextVertex = this.connectedVertices[next];
        if (!nextVertex)
          return;
        inDegree.set(next, (inDegree.get(next) || 0) + 1);
      });
    });
    inDegree.forEach((degree, value) => {
      if (degree === 0) {
        zeroInDegreeQueue.push(value);
      }
    });
    while (zeroInDegreeQueue.length > 0) {
      const vertexKey = zeroInDegreeQueue.shift();
      result.push(vertexKey);
      const v = connectedVertexKeysWithValues.find((key2) => key2 === vertexKey);
      if (v) {
        this.connectedVertices[v]?.next.forEach((adjVertex) => {
          const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1;
          inDegree.set(adjVertex, adjVertexInDegree);
          if (adjVertexInDegree === 0) {
            zeroInDegreeQueue.push(adjVertex);
          }
        });
      }
    }
    if (result.length !== connectedVertexKeysWithValues.length) {
      throw new Error("The graph contains a cycle, and thus can not be sorted topologically.");
    }
    const filterUndefined = (value) => value !== void 0;
    this.sortedConnectedValues = result.map((key2) => this.connectedVertices[key2].value).filter(filterUndefined);
    this.needsSort = false;
  }
  clear() {
    this.allVertices = {};
    this.isolatedVertices = {};
    this.connectedVertices = {};
    this.sortedConnectedValues = [];
    this.needsSort = false;
  }
  static isKey(value) {
    return typeof value === "string" || typeof value === "symbol";
  }
  static isValue(value) {
    return typeof value === "object" && "key" in value;
  }
}
class Task {
  key;
  stage;
  callback;
  runTask = true;
  stop() {
    this.runTask = false;
  }
  start() {
    this.runTask = true;
  }
  constructor(stage, key2, callback) {
    this.stage = stage;
    this.key = key2;
    this.callback = callback;
  }
  run(delta) {
    if (!this.runTask)
      return;
    this.callback(delta);
  }
}
class Stage extends DAG {
  key;
  scheduler;
  get tasks() {
    return this.sortedVertices;
  }
  callback = (_, r) => r();
  constructor(scheduler, key2, callback) {
    super();
    this.scheduler = scheduler;
    this.key = key2;
    if (callback)
      this.callback = callback.bind(this);
  }
  createTask(key2, callback, options) {
    const task = new Task(this, key2, callback);
    this.add(key2, task, options);
    return task;
  }
  getTask(key2) {
    return this.getValueByKey(key2);
  }
  removeTask = this.remove.bind(this);
  run(delta) {
    this.callback(delta, (deltaOverride) => {
      this.forEachNode((task) => {
        task.run(deltaOverride ?? delta);
      });
    });
  }
  runWithTiming(delta) {
    const taskTimings = {};
    this.callback(delta, (deltaOverride) => {
      this.forEachNode((task) => {
        const start = performance.now();
        task.run(deltaOverride ?? delta);
        const duration = performance.now() - start;
        taskTimings[task.key] = duration;
      });
    });
    return taskTimings;
  }
  getSchedule() {
    return this.mapNodes((l) => l.key.toString());
  }
}
class Scheduler extends DAG {
  lastTime = performance.now();
  clampDeltaTo = 0.1;
  get stages() {
    return this.sortedVertices;
  }
  constructor(options) {
    super();
    if (options?.clampDeltaTo)
      this.clampDeltaTo = options.clampDeltaTo;
    this.run = this.run.bind(this);
  }
  createStage(key2, options) {
    const stage = new Stage(this, key2, options?.callback);
    this.add(key2, stage, {
      after: options?.after,
      before: options?.before
    });
    return stage;
  }
  getStage(key2) {
    return this.getValueByKey(key2);
  }
  removeStage = this.remove.bind(this);
  /**
   * Runs all the stages in the scheduler.
   *
   * @param time The time in milliseconds since the start of the program.
   */
  run(time) {
    const delta = time - this.lastTime;
    this.forEachNode((stage) => {
      stage.run(Math.min(delta / 1e3, this.clampDeltaTo));
    });
    this.lastTime = time;
  }
  runWithTiming(time) {
    const delta = time - this.lastTime;
    const stageTimings = {};
    const start = performance.now();
    this.forEachNode((stage) => {
      const start2 = performance.now();
      const taskTimings = stage.runWithTiming(Math.min(delta / 1e3, this.clampDeltaTo));
      const duration = performance.now() - start2;
      stageTimings[stage.key.toString()] = {
        duration,
        tasks: taskTimings
      };
    });
    return {
      total: performance.now() - start,
      stages: stageTimings
    };
  }
  getSchedule(include = {
    tasks: true
  }) {
    return {
      stages: this.mapNodes((stage) => {
        if (stage === void 0)
          throw new Error("Stage not found");
        return {
          key: stage.key.toString(),
          ...{ tasks: include.tasks ? stage.getSchedule() : void 0 }
        };
      })
    };
  }
  dispose() {
    this.clear();
  }
}
const watch = (stores, callback) => {
  const d = derived(stores, (values) => {
    return values;
  });
  let cleanupFn;
  const unsubscribe = d.subscribe(async (values) => {
    if (cleanupFn)
      cleanupFn();
    const fn = await callback(values);
    if (fn)
      cleanupFn = fn;
  });
  onDestroy(() => {
    unsubscribe();
    if (cleanupFn)
      cleanupFn();
  });
};
const currentWritable = (value) => {
  const store = writable(value);
  const extendedWritable = {
    set: (value2) => {
      extendedWritable.current = value2;
      store.set(value2);
    },
    subscribe: store.subscribe,
    update: (fn) => {
      const newValue = fn(extendedWritable.current);
      extendedWritable.current = newValue;
      store.set(newValue);
    },
    current: value
  };
  return extendedWritable;
};
const defaultCamera = new PerspectiveCamera(75, 0, 0.1, 1e3);
defaultCamera.position.z = 5;
defaultCamera.lookAt(0, 0, 0);
const getDefaultCamera = () => defaultCamera;
const setDefaultCameraAspectOnSizeChange = (ctx) => {
  watch(ctx.size, (size) => {
    if (ctx.camera.current === defaultCamera) {
      const cam = ctx.camera.current;
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
      ctx.invalidate();
    }
  });
};
const useLegacyFrameCompatibilityContextKey = Symbol("use-legacy-frame-compatibility-context");
const injectLegacyFrameCompatibilityContext = () => {
  const ctx = {
    useFrameOrders: [],
    useRenderOrders: []
  };
  setContext(useLegacyFrameCompatibilityContextKey, ctx);
  return ctx;
};
const useLegacyFrameCompatibilityContext = () => {
  const ctx = getContext(useLegacyFrameCompatibilityContextKey);
  if (ctx === void 0) {
    throw new Error("No legacy frame compatibility context found, are you using this hook inside of <Canvas>?");
  }
  return ctx;
};
const createThrelteContext = (options) => {
  const internalCtx = {
    frameInvalidated: true,
    advance: false,
    autoInvalidations: /* @__PURE__ */ new Set(),
    resetFrameInvalidation: () => {
      internalCtx.frameInvalidated = false;
      internalCtx.advance = false;
    },
    dispose: async (force = false) => {
      await tick();
      if (!internalCtx.shouldDispose && !force)
        return;
      internalCtx.disposableObjects.forEach((mounted, object) => {
        if (mounted === 0 || force) {
          object?.dispose?.();
          internalCtx.disposableObjects.delete(object);
        }
      });
      internalCtx.shouldDispose = false;
    },
    collectDisposableObjects: (object, objects) => {
      const disposables = objects ?? [];
      if (!object)
        return disposables;
      if (object?.dispose && typeof object.dispose === "function" && object.type !== "Scene") {
        disposables.push(object);
      }
      Object.entries(object).forEach(([propKey, propValue]) => {
        if (propKey === "parent" || propKey === "children" || typeof propValue !== "object")
          return;
        const value = propValue;
        if (value?.dispose) {
          internalCtx.collectDisposableObjects(value, disposables);
        }
      });
      return disposables;
    },
    addDisposableObjects: (objects) => {
      objects.forEach((obj) => {
        const currentValue = internalCtx.disposableObjects.get(obj);
        if (currentValue) {
          internalCtx.disposableObjects.set(obj, currentValue + 1);
        } else {
          internalCtx.disposableObjects.set(obj, 1);
        }
      });
    },
    removeDisposableObjects: (objects) => {
      if (objects.length === 0)
        return;
      objects.forEach((obj) => {
        const currentValue = internalCtx.disposableObjects.get(obj);
        if (currentValue && currentValue > 0) {
          internalCtx.disposableObjects.set(obj, currentValue - 1);
        }
      });
      internalCtx.shouldDispose = true;
    },
    disposableObjects: /* @__PURE__ */ new Map(),
    shouldDispose: false
  };
  const { useRenderOrders } = injectLegacyFrameCompatibilityContext();
  const scheduler = new Scheduler();
  const mainStage = scheduler.createStage(Symbol("threlte-main-stage"));
  const renderStage = scheduler.createStage(Symbol("threlte-render-stage"), {
    after: mainStage,
    callback(_, runTasks) {
      if (ctx.shouldRender())
        runTasks();
    }
  });
  const autoRenderTask = renderStage.createTask(Symbol("threlte-auto-render-task"), (_) => {
    if (useRenderOrders.length > 0)
      return;
    ctx.renderer.render(ctx.scene, ctx.camera.current);
  });
  const ctx = {
    size: derived([options.userSize, options.parentSize], ([uSize, pSize]) => {
      return uSize ? uSize : pSize;
    }),
    camera: currentWritable(getDefaultCamera()),
    scene: new Scene$1(),
    renderer: void 0,
    invalidate: () => {
      internalCtx.frameInvalidated = true;
    },
    advance: () => {
      internalCtx.advance = true;
    },
    colorSpace: currentWritable(options.colorSpace),
    toneMapping: currentWritable(options.toneMapping),
    dpr: currentWritable(options.dpr),
    useLegacyLights: currentWritable(options.useLegacyLights),
    shadows: currentWritable(options.shadows),
    colorManagementEnabled: currentWritable(options.colorManagementEnabled),
    renderMode: currentWritable(options.renderMode),
    autoRender: currentWritable(options.autoRender),
    scheduler,
    mainStage,
    renderStage,
    autoRenderTask,
    shouldRender: () => {
      const shouldRender = ctx.renderMode.current === "always" || ctx.renderMode.current === "on-demand" && (internalCtx.frameInvalidated || internalCtx.autoInvalidations.size > 0) || ctx.renderMode.current === "manual" && internalCtx.advance;
      return shouldRender;
    }
  };
  setDefaultCameraAspectOnSizeChange(ctx);
  const userCtx = currentWritable({});
  setContext("threlte", ctx);
  setContext("threlte-internal-context", internalCtx);
  setContext("threlte-user-context", userCtx);
  return ctx;
};
const browser = typeof window !== "undefined";
const useParentSize = () => {
  const parentSize = currentWritable({ width: 0, height: 0 });
  if (!browser) {
    return {
      parentSize,
      parentSizeAction: () => {
      }
    };
  }
  const mutationOptions = { childList: true, subtree: false, attributes: false };
  let el;
  const observeParent = (parent) => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    resizeObserver.observe(parent);
    mutationObserver.observe(parent, mutationOptions);
  };
  const resizeObserver = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    if (width === parentSize.current.width && height === parentSize.current.height)
      return;
    parentSize.set({ width, height });
  });
  const mutationObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.removedNodes) {
        if (el === node && el.parentElement) {
          observeParent(el.parentElement);
          return;
        }
      }
    }
  });
  const parentSizeAction = (node) => {
    el = node;
    const parent = el.parentElement;
    if (!parent)
      return;
    parentSize.set({
      width: parent.clientWidth,
      height: parent.clientHeight
    });
    observeParent(parent);
  };
  onDestroy(() => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  });
  return {
    parentSize,
    parentSizeAction
  };
};
function createObjectStore(object, onChange) {
  const objectStore = writable(object);
  let unwrappedObject = object;
  const unsubscribeObjectStore = objectStore.subscribe((o) => unwrappedObject = o);
  onDestroy(unsubscribeObjectStore);
  const set = (newObject) => {
    if (newObject?.uuid === unwrappedObject?.uuid)
      return;
    const oldObject = unwrappedObject;
    objectStore.set(newObject);
    onChange?.(newObject, oldObject);
  };
  const update = (callback) => {
    const newObject = callback(unwrappedObject);
    if (newObject?.uuid === unwrappedObject?.uuid)
      return;
    const oldObject = unwrappedObject;
    objectStore.set(newObject);
    onChange?.(newObject, oldObject);
  };
  return {
    ...objectStore,
    set,
    update
  };
}
const useThrelte = () => {
  const context = getContext("threlte");
  if (context === void 0) {
    throw new Error("No Threlte context found, are you using this hook inside of <Canvas>?");
  }
  return context;
};
const key = Symbol("threlte-hierarchical-parent-context");
const useParent = () => {
  return getContext(key);
};
const setParent = (context) => {
  return setContext(key, context);
};
const createParentContext = (ref) => {
  const context = createObjectStore(ref);
  setContext(key, context);
  return context;
};
const useHierarchicalObject = () => {
  return {
    onChildMount: getContext("threlte-hierarchical-object-on-mount"),
    onChildDestroy: getContext("threlte-hierarchical-object-on-destroy")
  };
};
const HierarchicalObject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $parentStore, $$unsubscribe_parentStore;
  let { object = void 0 } = $$props;
  let { onChildMount = void 0 } = $$props;
  const onChildMountProxy = (child) => {
    onChildMount?.(child);
  };
  let { onChildDestroy = void 0 } = $$props;
  const onChildDestroyProxy = (child) => {
    onChildDestroy?.(child);
  };
  const { invalidate } = useThrelte();
  const parentStore = useParent();
  $$unsubscribe_parentStore = subscribe(parentStore, (value) => $parentStore = value);
  let { parent = $parentStore } = $$props;
  const parentCallbacks = useHierarchicalObject();
  if (object) {
    parentCallbacks.onChildMount?.(object);
    invalidate();
  }
  const objectStore = createObjectStore(object, (newObject, oldObject) => {
    if (oldObject) {
      parentCallbacks.onChildDestroy?.(oldObject);
      invalidate();
    }
    if (newObject) {
      parentCallbacks.onChildMount?.(newObject);
      invalidate();
    }
  });
  onDestroy(() => {
    if (object) {
      parentCallbacks.onChildDestroy?.(object);
      invalidate();
    }
  });
  setContext("threlte-hierarchical-object-on-mount", onChildMountProxy);
  setContext("threlte-hierarchical-object-on-destroy", onChildDestroyProxy);
  setParent(objectStore);
  if ($$props.object === void 0 && $$bindings.object && object !== void 0) $$bindings.object(object);
  if ($$props.onChildMount === void 0 && $$bindings.onChildMount && onChildMount !== void 0) $$bindings.onChildMount(onChildMount);
  if ($$props.onChildDestroy === void 0 && $$bindings.onChildDestroy && onChildDestroy !== void 0) $$bindings.onChildDestroy(onChildDestroy);
  if ($$props.parent === void 0 && $$bindings.parent && parent !== void 0) $$bindings.parent(parent);
  parent = $parentStore;
  {
    objectStore.set(object);
  }
  $$unsubscribe_parentStore();
  return `   ${slots.default ? slots.default({}) : ``}`;
});
const SceneGraphObject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { object } = $$props;
  if ($$props.object === void 0 && $$bindings.object && object !== void 0) $$bindings.object(object);
  return `${validate_component(HierarchicalObject, "HierarchicalObject").$$render(
    $$result,
    {
      object,
      onChildMount: (child) => object.add(child),
      onChildDestroy: (child) => object.remove(child)
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const shallowEqualArrays = (arrA, arrB) => {
  if (arrA === arrB)
    return true;
  if (!arrA || !arrB)
    return false;
  const len = arrA.length;
  if (arrB.length !== len)
    return false;
  for (let i = 0; i < len; i++)
    if (arrA[i] !== arrB[i])
      return false;
  return true;
};
const createCache = () => {
  setContext("threlte-cache", []);
};
const useCache = () => {
  const cache = getContext("threlte-cache");
  if (!cache) {
    throw new Error("No cache found. The cache can only be used in a child component to <Canvas>.");
  }
  const remember = (callback, keys) => {
    for (const entry2 of cache) {
      if (shallowEqualArrays(keys, entry2.keys)) {
        if (entry2.error)
          throw entry2.error;
        if (entry2.promise)
          return entry2.promise;
      }
    }
    const entry = {
      promise: callback(),
      keys,
      value: void 0
    };
    cache.push(entry);
    entry.promise.catch((error) => {
      entry.error = error;
    });
    return entry.promise;
  };
  const clear = (keys) => {
    const index = cache.findIndex((entry) => shallowEqualArrays(keys, entry.keys));
    if (index !== -1) {
      cache.splice(index, 1);
    }
  };
  return {
    remember,
    clear
  };
};
const normalizedRevision = REVISION.replace("dev", "");
const revision$1 = Number.parseInt(normalizedRevision);
const useRenderer = (ctx) => {
  const renderer = writable(void 0);
  const createRenderer = (canvas, rendererParameters) => {
    ctx.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      canvas,
      antialias: true,
      alpha: true,
      ...rendererParameters
    });
    renderer.set(ctx.renderer);
  };
  watch([ctx.colorManagementEnabled], ([colorManagementEnabled]) => {
    ColorManagement.enabled = colorManagementEnabled;
  });
  watch([renderer, ctx.colorSpace], ([renderer2, colorSpace]) => {
    if (!renderer2)
      return;
    renderer2.outputColorSpace = colorSpace;
  });
  watch([renderer, ctx.dpr], ([renderer2, dpr]) => {
    renderer2?.setPixelRatio(dpr);
  });
  watch([renderer, ctx.size], ([renderer2, size]) => {
    if (renderer2?.xr?.isPresenting)
      return;
    renderer2?.setSize(size.width, size.height);
  });
  watch([renderer, ctx.shadows], ([renderer2, shadows]) => {
    if (!renderer2)
      return;
    renderer2.shadowMap.enabled = !!shadows;
    if (shadows && shadows !== true) {
      renderer2.shadowMap.type = shadows;
    } else if (shadows === true) {
      renderer2.shadowMap.type = PCFSoftShadowMap;
    }
  });
  watch([renderer, ctx.toneMapping], ([renderer2, toneMapping]) => {
    if (!renderer2)
      return;
    renderer2.toneMapping = toneMapping;
  });
  watch([renderer, ctx.useLegacyLights], ([renderer2, useLegacyLights]) => {
    if (!renderer2)
      return;
    if (useLegacyLights) {
      renderer2.useLegacyLights = useLegacyLights;
    }
  });
  return {
    createRenderer
  };
};
const useThrelteInternal = () => {
  return getContext("threlte-internal-context");
};
const css$1 = {
  code: "canvas.svelte-o3oskp{display:block}",
  map: `{"version":3,"file":"Canvas.svelte","sources":["Canvas.svelte"],"sourcesContent":["<script>import { onDestroy, onMount } from 'svelte';\\nimport { writable } from 'svelte/store';\\nimport { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';\\nimport { createThrelteContext } from './lib/contexts';\\nimport { useParentSize } from './hooks/useParentSize';\\nimport SceneGraphObject from './internal/SceneGraphObject.svelte';\\nimport { browser } from './lib/browser';\\nimport { createCache } from './lib/cache';\\nimport { revision } from './lib/revision';\\nimport { watch } from './lib/storeUtils';\\nimport { useRenderer } from './lib/useRenderer';\\nimport { useThrelteInternal } from './hooks/useThrelteInternal';\\n/**\\n * Colors supplied to three.js — from color pickers, textures, 3D models, and other sources —\\n * each have an associated color space. Those not already in the Linear-sRGB working color\\n * space must be converted, and textures be given the correct texture.colorSpace assignment.\\n *\\n * Set to true for certain conversions (for hexadecimal and CSS colors in sRGB) to be made automatically.\\n *\\n * This property is not reactive and must be enabled before initializing colors.\\n *\\n * @default true\\n */\\nexport let colorManagementEnabled = true;\\n/**\\n * @default 'srgb'\\n */\\nexport let colorSpace = 'srgb';\\n/**\\n * @default window.devicePixelRatio\\n */\\nexport let dpr = browser ? window.devicePixelRatio : 1;\\n/**\\n * @default 'on-demand'\\n */\\nexport let renderMode = 'on-demand';\\n/**\\n * Parameters sent to the WebGLRenderer when created.\\n *\\n * This property can only be set when creating a \`<Canvas>\` and is not reactive.\\n */\\nexport let rendererParameters = undefined;\\n/**\\n * @default PCFSoftShadowMap\\n */\\nexport let shadows = PCFSoftShadowMap;\\nexport let size = undefined;\\n/**\\n * @default ACESFilmicToneMapping\\n */\\nexport let toneMapping = ACESFilmicToneMapping;\\n/**\\n * This property is not reactive and must be set at initialization.\\n *\\n * @default false if greater than or equal to r155, true if less than 155\\n * @see https://github.com/mrdoob/three.js/pull/26392\\n */\\nexport let useLegacyLights = revision >= 155 ? false : true;\\n/**\\n * By default, Threlte will automatically render the scene. To implement\\n * custom render pipelines, set this to \`false\`.\\n *\\n * @default true\\n */\\nexport let autoRender = true;\\nlet canvas;\\nlet initialized = writable(false);\\n// user size as a store\\nconst userSize = writable(size);\\n$: userSize.set(size);\\n// in case the user didn't define a fixed size, use the parent elements size\\nconst { parentSize, parentSizeAction } = useParentSize();\\nconst context = createThrelteContext({\\n    colorManagementEnabled,\\n    colorSpace,\\n    dpr,\\n    renderMode,\\n    parentSize,\\n    autoRender,\\n    shadows,\\n    toneMapping,\\n    useLegacyLights,\\n    userSize\\n});\\nconst internalCtx = useThrelteInternal();\\n// context bindings\\nexport const ctx = context;\\n$: ctx.colorSpace.set(colorSpace);\\n$: ctx.dpr.set(dpr);\\n$: ctx.renderMode.set(renderMode);\\n$: ctx.autoRender.set(autoRender);\\n$: ctx.shadows.set(shadows);\\n$: ctx.toneMapping.set(toneMapping);\\nwatch([initialized, ctx.autoRender], ([initialized, autoRender]) => {\\n    if (initialized && autoRender) {\\n        ctx.autoRenderTask.start();\\n    }\\n    else {\\n        ctx.autoRenderTask.stop();\\n    }\\n    return () => {\\n        ctx.autoRenderTask.stop();\\n    };\\n});\\n// create cache context for caching assets\\ncreateCache();\\n// the hook useRenderer is managing the renderer.\\nconst { createRenderer } = useRenderer(ctx);\\nonMount(() => {\\n    createRenderer(canvas, rendererParameters);\\n    ctx.renderer.setAnimationLoop((time) => {\\n        internalCtx.dispose();\\n        ctx.scheduler.run(time);\\n        internalCtx.resetFrameInvalidation();\\n    });\\n    initialized.set(true);\\n});\\nonDestroy(() => {\\n    internalCtx.dispose(true);\\n    ctx.scheduler.dispose();\\n    // Renderer is marked as optional because it is never defined in SSR\\n    ctx.renderer?.dispose();\\n});\\n<\/script>\\n\\n<canvas\\n  use:parentSizeAction\\n  bind:this={canvas}\\n>\\n  {#if $initialized}\\n    <SceneGraphObject object={ctx.scene}>\\n      <slot />\\n    </SceneGraphObject>\\n  {/if}\\n</canvas>\\n\\n<style>\\n  canvas {\\n    display: block;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAyIE,oBAAO,CACL,OAAO,CAAE,KACX"}`
};
const Canvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $initialized, $$unsubscribe_initialized;
  let { colorManagementEnabled = true } = $$props;
  let { colorSpace = "srgb" } = $$props;
  let { dpr = browser ? window.devicePixelRatio : 1 } = $$props;
  let { renderMode = "on-demand" } = $$props;
  let { rendererParameters = void 0 } = $$props;
  let { shadows = PCFSoftShadowMap } = $$props;
  let { size = void 0 } = $$props;
  let { toneMapping = ACESFilmicToneMapping } = $$props;
  let { useLegacyLights = revision$1 >= 155 ? false : true } = $$props;
  let { autoRender = true } = $$props;
  let canvas;
  let initialized = writable(false);
  $$unsubscribe_initialized = subscribe(initialized, (value) => $initialized = value);
  const userSize = writable(size);
  const { parentSize, parentSizeAction } = useParentSize();
  const context = createThrelteContext({
    colorManagementEnabled,
    colorSpace,
    dpr,
    renderMode,
    parentSize,
    autoRender,
    shadows,
    toneMapping,
    useLegacyLights,
    userSize
  });
  const internalCtx = useThrelteInternal();
  const ctx = context;
  watch([initialized, ctx.autoRender], ([initialized2, autoRender2]) => {
    if (initialized2 && autoRender2) {
      ctx.autoRenderTask.start();
    } else {
      ctx.autoRenderTask.stop();
    }
    return () => {
      ctx.autoRenderTask.stop();
    };
  });
  createCache();
  useRenderer(ctx);
  onDestroy(() => {
    internalCtx.dispose(true);
    ctx.scheduler.dispose();
    ctx.renderer?.dispose();
  });
  if ($$props.colorManagementEnabled === void 0 && $$bindings.colorManagementEnabled && colorManagementEnabled !== void 0) $$bindings.colorManagementEnabled(colorManagementEnabled);
  if ($$props.colorSpace === void 0 && $$bindings.colorSpace && colorSpace !== void 0) $$bindings.colorSpace(colorSpace);
  if ($$props.dpr === void 0 && $$bindings.dpr && dpr !== void 0) $$bindings.dpr(dpr);
  if ($$props.renderMode === void 0 && $$bindings.renderMode && renderMode !== void 0) $$bindings.renderMode(renderMode);
  if ($$props.rendererParameters === void 0 && $$bindings.rendererParameters && rendererParameters !== void 0) $$bindings.rendererParameters(rendererParameters);
  if ($$props.shadows === void 0 && $$bindings.shadows && shadows !== void 0) $$bindings.shadows(shadows);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.toneMapping === void 0 && $$bindings.toneMapping && toneMapping !== void 0) $$bindings.toneMapping(toneMapping);
  if ($$props.useLegacyLights === void 0 && $$bindings.useLegacyLights && useLegacyLights !== void 0) $$bindings.useLegacyLights(useLegacyLights);
  if ($$props.autoRender === void 0 && $$bindings.autoRender && autoRender !== void 0) $$bindings.autoRender(autoRender);
  if ($$props.ctx === void 0 && $$bindings.ctx && ctx !== void 0) $$bindings.ctx(ctx);
  $$result.css.add(css$1);
  {
    userSize.set(size);
  }
  {
    ctx.colorSpace.set(colorSpace);
  }
  {
    ctx.dpr.set(dpr);
  }
  {
    ctx.renderMode.set(renderMode);
  }
  {
    ctx.autoRender.set(autoRender);
  }
  {
    ctx.shadows.set(shadows);
  }
  {
    ctx.toneMapping.set(toneMapping);
  }
  $$unsubscribe_initialized();
  return `<canvas class="svelte-o3oskp"${add_attribute("this", canvas, 0)}>${$initialized ? `${validate_component(SceneGraphObject, "SceneGraphObject").$$render($$result, { object: ctx.scene }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : ``} </canvas>`;
});
const contextName = "threlte-disposable-object-context";
const DisposableObject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mergedDispose, $$unsubscribe_mergedDispose;
  let $parentDispose, $$unsubscribe_parentDispose;
  const { collectDisposableObjects, addDisposableObjects, removeDisposableObjects } = useThrelteInternal();
  let { object = void 0 } = $$props;
  let previousObject = object;
  let { dispose = void 0 } = $$props;
  const parentDispose = getContext(contextName);
  $$unsubscribe_parentDispose = subscribe(parentDispose, (value) => $parentDispose = value);
  const mergedDispose = writable(dispose ?? $parentDispose ?? true);
  $$unsubscribe_mergedDispose = subscribe(mergedDispose, (value) => $mergedDispose = value);
  setContext(contextName, mergedDispose);
  let disposables = $mergedDispose ? collectDisposableObjects(object) : [];
  addDisposableObjects(disposables);
  onDestroy(() => {
    removeDisposableObjects(disposables);
  });
  if ($$props.object === void 0 && $$bindings.object && object !== void 0) $$bindings.object(object);
  if ($$props.dispose === void 0 && $$bindings.dispose && dispose !== void 0) $$bindings.dispose(dispose);
  {
    mergedDispose.set(dispose ?? $parentDispose ?? true);
  }
  {
    {
      if (object !== previousObject) {
        removeDisposableObjects(disposables);
        disposables = $mergedDispose ? collectDisposableObjects(object) : [];
        addDisposableObjects(disposables);
        previousObject = object;
      }
    }
  }
  $$unsubscribe_mergedDispose();
  $$unsubscribe_parentDispose();
  return `${slots.default ? slots.default({}) : ``}`;
});
const classRegex = /^\s*class\s+/;
const isClass = (input) => {
  if (typeof input !== "function") {
    return false;
  }
  return classRegex.test(input.toString());
};
const argsIsConstructorParameters = (args) => {
  return Array.isArray(args);
};
const determineRef = (is, args) => {
  if (isClass(is)) {
    if (argsIsConstructorParameters(args)) {
      return new is(...args);
    } else {
      return new is();
    }
  }
  return is;
};
const extendsObject3D = (object) => {
  return "isObject3D" in object;
};
const isDisposableObject = (object) => {
  return "dispose" in object;
};
const resolvePropertyPath = (target, propertyPath) => {
  if (propertyPath.includes(".")) {
    const path = propertyPath.split(".");
    const key2 = path.pop();
    for (let i = 0; i < path.length; i += 1) {
      target = target[path[i]];
    }
    return {
      target,
      key: key2
    };
  } else {
    return {
      target,
      key: propertyPath
    };
  }
};
const initialValueBeforeAttach = Symbol("initialValueBeforeAttach");
const useAttach = () => {
  const { invalidate } = useThrelte();
  let isAttached = false;
  let valueBeforeAttach = initialValueBeforeAttach;
  let detachFn;
  let attachedTo;
  let attachedKey;
  const update = (instance, parent, attach) => {
    detach();
    if (!attach) {
      const i = instance;
      const isMaterial = i?.isMaterial || false;
      if (isMaterial) {
        attach = "material";
      }
      const isGeometry = i?.isBufferGeometry || i?.isGeometry || false;
      if (isGeometry) {
        attach = "geometry";
      }
    }
    if (!attach)
      return;
    if (typeof attach === "function") {
      detachFn = attach(parent, instance);
    } else {
      const { target, key: key2 } = resolvePropertyPath(parent, attach);
      valueBeforeAttach = target[key2];
      target[key2] = instance;
      attachedTo = target;
      attachedKey = key2;
    }
    isAttached = true;
    invalidate();
  };
  const detach = () => {
    if (!isAttached)
      return;
    if (detachFn) {
      detachFn();
      detachFn = void 0;
    } else if (attachedTo && attachedKey && valueBeforeAttach !== initialValueBeforeAttach) {
      attachedTo[attachedKey] = valueBeforeAttach;
      valueBeforeAttach = initialValueBeforeAttach;
      attachedTo = void 0;
      attachedKey = void 0;
    }
    isAttached = false;
    invalidate();
  };
  onDestroy(() => {
    detach();
  });
  return {
    update
  };
};
const isCamera = (value) => {
  return value && value.isCamera;
};
const isOrthographicCamera = (value) => {
  return value && value.isOrthographicCamera;
};
const isPerspectiveCamera = (value) => {
  return value && value.isPerspectiveCamera;
};
const isPerspectiveCameraOrOrthographicCamera = (value) => {
  return isPerspectiveCamera(value) || isOrthographicCamera(value);
};
const useCamera = () => {
  const { invalidate, size, camera } = useThrelte();
  let currentInstance;
  let unsubscribe = void 0;
  onDestroy(() => {
    unsubscribe?.();
  });
  const subscriber = (size2) => {
    if (!currentInstance)
      return;
    if (isOrthographicCamera(currentInstance)) {
      currentInstance.left = size2.width / -2;
      currentInstance.right = size2.width / 2;
      currentInstance.top = size2.height / 2;
      currentInstance.bottom = size2.height / -2;
      currentInstance.updateProjectionMatrix();
      currentInstance.updateMatrixWorld();
      invalidate();
    } else if (isPerspectiveCamera(currentInstance)) {
      currentInstance.aspect = size2.width / size2.height;
      currentInstance.updateProjectionMatrix();
      currentInstance.updateMatrixWorld();
      invalidate();
    }
  };
  const update = (instance, manual) => {
    unsubscribe?.();
    if (manual || !isPerspectiveCameraOrOrthographicCamera(instance)) {
      currentInstance = void 0;
      return;
    }
    currentInstance = instance;
    unsubscribe = size.subscribe(subscriber);
  };
  const makeDefaultCamera = (instance, makeDefault) => {
    if (!isCamera(instance) || !makeDefault)
      return;
    camera.set(instance);
    invalidate();
  };
  return {
    update,
    makeDefaultCamera
  };
};
const createRawEventDispatcher = () => {
  const component = get_current_component();
  const dispatchRawEvent = (type, value) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      callbacks.forEach((fn) => {
        fn(value);
      });
    }
  };
  const hasEventListener = (type) => {
    return Boolean(component.$$.callbacks[type]);
  };
  Object.defineProperty(dispatchRawEvent, "hasEventListener", {
    value: hasEventListener,
    enumerable: true
  });
  return dispatchRawEvent;
};
const useCreateEvent = () => {
  createRawEventDispatcher();
  const cleanupFunctions = [];
  const updateRef = (newRef) => {
    return;
  };
  onDestroy(() => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  });
  return {
    updateRef
  };
};
const isEventDispatcher = (value) => {
  return !!value?.addEventListener;
};
const useEvents = () => {
  const dispatch = createRawEventDispatcher();
  get_current_component();
  const eventHandlerProxy = (event) => {
    if (event?.type) {
      dispatch(event.type, event);
    }
  };
  const cleanupEventListeners = (ref2, events) => {
    if (isEventDispatcher(ref2)) {
      events.forEach((eventName) => {
        ref2.removeEventListener(eventName, eventHandlerProxy);
      });
    }
  };
  const addEventListeners = (ref2, events) => {
    if (isEventDispatcher(ref2)) {
      events.forEach((eventName) => {
        ref2.addEventListener(eventName, eventHandlerProxy);
      });
    }
  };
  const ref = writable();
  const eventNames = writable([]);
  watch([ref, eventNames], ([$ref, $eventNames]) => {
    addEventListeners($ref, $eventNames);
    return () => cleanupEventListeners($ref, $eventNames);
  });
  const updateRef = (newRef) => {
    ref.set(newRef);
  };
  return {
    updateRef
  };
};
const usePlugins = (params) => {
  const pluginContextName = "threlte-plugin-context";
  const plugins = getContext(pluginContextName);
  if (!plugins)
    return;
  const pluginsReturns = Object.values(plugins).map((plugin) => plugin(params)).filter(Boolean);
  const pluginsProps = pluginsReturns.flatMap((callback) => callback.pluginProps ?? []);
  let refCleanupCallbacks = [];
  onDestroy(() => {
    refCleanupCallbacks.forEach((callback) => callback());
  });
  const updateRef = (ref) => {
    refCleanupCallbacks.forEach((callback) => callback());
    refCleanupCallbacks = [];
    pluginsReturns.forEach((callback) => {
      const cleanupCallback = callback.onRefChange?.(ref);
      if (cleanupCallback) {
        refCleanupCallbacks.push(cleanupCallback);
      }
    });
  };
  const updateProps = (props) => {
    pluginsReturns.forEach((callback) => {
      callback.onPropsChange?.(props);
    });
  };
  const updateRestProps = (restProps) => {
    pluginsReturns.forEach((callback) => {
      callback.onRestPropsChange?.(restProps);
    });
  };
  return {
    updateRef,
    updateProps,
    updateRestProps,
    pluginsProps
  };
};
const ignoredProps = /* @__PURE__ */ new Set(["$$scope", "$$slots", "type", "args", "attach", "instance"]);
const updateProjectionMatrixKeys = /* @__PURE__ */ new Set([
  "fov",
  "aspect",
  "near",
  "far",
  "left",
  "right",
  "top",
  "bottom",
  "zoom"
]);
const memoizeProp = (value) => {
  if (typeof value === "string")
    return true;
  if (typeof value === "number")
    return true;
  if (typeof value === "boolean")
    return true;
  if (typeof value === "undefined")
    return true;
  if (value === null)
    return true;
  return false;
};
const createSetter = (target, key2, value) => {
  if (!Array.isArray(value) && typeof value === "number" && typeof target[key2]?.setScalar === "function" && // colors do have a setScalar function, but we don't want to use it, because
  // the hex notation (i.e. 0xff0000) is very popular and matches the number
  // type. So we exclude colors here.
  !target[key2]?.isColor) {
    return (target2, key3, value2) => {
      target2[key3].setScalar(value2);
    };
  } else {
    if (typeof target[key2]?.set === "function") {
      if (Array.isArray(value)) {
        return (target2, key3, value2) => {
          target2[key3].set(...value2);
        };
      } else {
        return (target2, key3, value2) => {
          target2[key3].set(value2);
        };
      }
    } else {
      return (target2, key3, value2) => {
        target2[key3] = value2;
      };
    }
  }
};
const useProps = () => {
  const { invalidate } = useThrelte();
  const memoizedProps = /* @__PURE__ */ new Map();
  const memoizedSetters = /* @__PURE__ */ new Map();
  const setProp = (instance, propertyPath, value, options) => {
    if (memoizeProp(value)) {
      const memoizedProp = memoizedProps.get(propertyPath);
      if (memoizedProp && memoizedProp.instance === instance && memoizedProp.value === value) {
        return;
      }
      memoizedProps.set(propertyPath, {
        instance,
        value
      });
    }
    const { key: key2, target } = resolvePropertyPath(instance, propertyPath);
    if (value !== void 0 && value !== null) {
      const memoizedSetter = memoizedSetters.get(propertyPath);
      if (memoizedSetter) {
        memoizedSetter(target, key2, value);
      } else {
        const setter = createSetter(target, key2, value);
        memoizedSetters.set(propertyPath, setter);
        setter(target, key2, value);
      }
    } else {
      createSetter(target, key2, value)(target, key2, value);
    }
    if (options.manualCamera)
      return;
    if (updateProjectionMatrixKeys.has(key2) && (target.isPerspectiveCamera || target.isOrthographicCamera)) {
      target.updateProjectionMatrix();
    }
  };
  const updateProps = (instance, props, options) => {
    for (const key2 in props) {
      if (!ignoredProps.has(key2) && !options.pluginsProps?.includes(key2)) {
        setProp(instance, key2, props[key2], options);
      }
      invalidate();
    }
  };
  return {
    updateProps
  };
};
const T$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["is", "args", "attach", "manual", "makeDefault", "dispose", "ref"]);
  let $parent, $$unsubscribe_parent;
  let { is } = $$props;
  let { args = void 0 } = $$props;
  let { attach = void 0 } = $$props;
  let { manual = void 0 } = $$props;
  let { makeDefault = void 0 } = $$props;
  let { dispose = void 0 } = $$props;
  const parent = useParent();
  $$unsubscribe_parent = subscribe(parent, (value) => $parent = value);
  const createEvent = useCreateEvent();
  let ref = determineRef(is, args);
  createEvent.updateRef(ref);
  let initialized = false;
  const maybeSetRef = () => {
    if (!initialized) {
      initialized = true;
      return;
    }
    ref = determineRef(is, args);
    createEvent.updateRef(ref);
  };
  let { ref: publicRef = ref } = $$props;
  const parentContext = createParentContext(ref);
  const plugins = usePlugins({ ref, props: $$props });
  const pluginsProps = plugins?.pluginsProps ?? [];
  const props = useProps();
  const camera = useCamera();
  const attachment = useAttach();
  const events = useEvents();
  if ($$props.is === void 0 && $$bindings.is && is !== void 0) $$bindings.is(is);
  if ($$props.args === void 0 && $$bindings.args && args !== void 0) $$bindings.args(args);
  if ($$props.attach === void 0 && $$bindings.attach && attach !== void 0) $$bindings.attach(attach);
  if ($$props.manual === void 0 && $$bindings.manual && manual !== void 0) $$bindings.manual(manual);
  if ($$props.makeDefault === void 0 && $$bindings.makeDefault && makeDefault !== void 0) $$bindings.makeDefault(makeDefault);
  if ($$props.dispose === void 0 && $$bindings.dispose && dispose !== void 0) $$bindings.dispose(dispose);
  if ($$props.ref === void 0 && $$bindings.ref && publicRef !== void 0) $$bindings.ref(publicRef);
  {
    maybeSetRef();
  }
  publicRef = ref;
  {
    parentContext.set(ref);
  }
  {
    props.updateProps(ref, $$restProps, { manualCamera: manual, pluginsProps });
  }
  {
    camera.update(ref, manual);
  }
  {
    camera.makeDefaultCamera(ref, makeDefault);
  }
  {
    attachment.update(ref, $parent, attach);
  }
  {
    events.updateRef(ref);
  }
  {
    plugins?.updateRef(ref);
  }
  {
    plugins?.updateProps($$props);
  }
  {
    plugins?.updateRestProps($$restProps);
  }
  $$unsubscribe_parent();
  return `${isDisposableObject(ref) ? `${validate_component(DisposableObject, "DisposableObject").$$render($$result, { object: ref, dispose }, {}, {})}` : ``} ${extendsObject3D(ref) ? `${validate_component(SceneGraphObject, "SceneGraphObject").$$render($$result, { object: ref }, {}, {
    default: () => {
      return `${slots.default ? slots.default({ ref }) : ``}`;
    }
  })}` : `${slots.default ? slots.default({ ref }) : ``}`}`;
});
const catalogue = {};
const augmentConstructorArgs = (args, is) => {
  const module = catalogue[is] || THREE[is];
  if (!module) {
    throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`);
  }
  return {
    ...args,
    props: {
      ...args.props,
      is: module
    }
  };
};
const proxyTConstructor = (is) => {
  return new Proxy(class {
  }, {
    construct(_, [args]) {
      const castedArgs = args;
      return new T$1(augmentConstructorArgs(castedArgs, is));
    }
  });
};
const T = new Proxy(class {
}, {
  construct(_, [args]) {
    const castedArgs = args;
    return new T$1(castedArgs);
  },
  get(_, is) {
    return proxyTConstructor(is);
  }
});
function useTask(keyOrFn, fnOrOptions, options) {
  if (!browser) {
    return {
      task: void 0,
      start: () => void 0,
      stop: () => void 0,
      started: readable(false)
    };
  }
  let key2;
  let fn;
  let opts;
  if (DAG.isKey(keyOrFn)) {
    key2 = keyOrFn;
    fn = fnOrOptions;
    opts = options;
  } else {
    key2 = Symbol("useTask");
    fn = keyOrFn;
    opts = fnOrOptions;
  }
  const ctx = useThrelte();
  let stage = ctx.mainStage;
  if (opts) {
    if (opts.stage) {
      if (DAG.isValue(opts.stage)) {
        stage = opts.stage;
      } else {
        const maybeStage = ctx.scheduler.getStage(opts.stage);
        if (!maybeStage) {
          throw new Error(`No stage found with key ${opts.stage.toString()}`);
        }
        stage = maybeStage;
      }
    } else if (opts.after) {
      if (Array.isArray(opts.after)) {
        for (let index = 0; index < opts.after.length; index++) {
          const element = opts.after[index];
          if (DAG.isValue(element)) {
            stage = element.stage;
            break;
          }
        }
      } else if (DAG.isValue(opts.after)) {
        stage = opts.after.stage;
      }
    } else if (opts.before) {
      if (Array.isArray(opts.before)) {
        for (let index = 0; index < opts.before.length; index++) {
          const element = opts.before[index];
          if (DAG.isValue(element)) {
            stage = element.stage;
            break;
          }
        }
      } else if (DAG.isValue(opts.before)) {
        stage = opts.before.stage;
      }
    }
  }
  const { autoInvalidations } = getContext("threlte-internal-context");
  const started = writable(false);
  const task = stage.createTask(key2, fn, opts);
  const start = () => {
    started.set(true);
    if (opts?.autoInvalidate ?? true) {
      autoInvalidations.add(fn);
    }
    task.start();
  };
  const stop = () => {
    started.set(true);
    if (opts?.autoInvalidate ?? true) {
      autoInvalidations.delete(fn);
    }
    task.stop();
  };
  if (opts?.autoStart ?? true) {
    start();
  } else {
    stop();
  }
  onDestroy(() => {
    if (!stage)
      return;
    stage.removeTask(key2);
  });
  return {
    task,
    start,
    stop,
    started: {
      subscribe: started.subscribe
    }
  };
}
function useThrelteUserContext(namespace, value, options) {
  const userCtxStore = getContext("threlte-user-context");
  if (!userCtxStore) {
    throw new Error("No user context store found, did you invoke this function outside of your main <Canvas> component?");
  }
  if (!value) {
    return derived(userCtxStore, (ctx) => ctx[namespace]);
  }
  userCtxStore.update((ctx) => {
    if (namespace in ctx) {
      return ctx;
    }
    ctx[namespace] = value;
    return ctx;
  });
  return userCtxStore.current[namespace];
}
const orderToKey = (order) => `useFrame-order-${order.toString()}`;
const useFrame = (fn, options) => {
  if (!browser) {
    return {
      start: () => void 0,
      stop: () => void 0,
      started: readable(false)
    };
  }
  const started = writable(false);
  const ctx = useThrelte();
  const { useFrameOrders } = useLegacyFrameCompatibilityContext();
  const { autoInvalidations } = getContext("threlte-internal-context");
  let order = 0;
  while (useFrameOrders.includes(order)) {
    order += 0.01;
  }
  useFrameOrders.push(order);
  const key2 = orderToKey(order);
  const proxy = (delta) => {
    fn(ctx, delta);
  };
  const task = ctx.mainStage.createTask(key2, proxy, {
    after: useFrameOrders.filter((o) => o < order).map((o) => orderToKey(o)),
    before: useFrameOrders.filter((o) => o > order).map((o) => orderToKey(o))
  });
  const start = () => {
    started.set(true);
    {
      autoInvalidations.add(fn);
    }
    task.start();
  };
  const stop = () => {
    started.set(true);
    {
      autoInvalidations.delete(fn);
    }
    task.stop();
  };
  {
    start();
  }
  onDestroy(() => {
    ctx.mainStage.removeTask(key2);
    useFrameOrders.splice(useFrameOrders.indexOf(order), 1);
  });
  return {
    start,
    stop,
    started: {
      subscribe: started.subscribe
    }
  };
};
const asyncWritable = (promise) => {
  const store = writable(void 0);
  const error = writable(void 0);
  promise.then((result) => {
    store.set(result);
  }).catch((e) => {
    console.error("Error in asyncWritable:", e.message);
    error.set(e);
  });
  return Object.assign(Object.assign(promise, store), { error, promise });
};
function useLoader(Proto, options) {
  const { remember, clear: clearCacheItem } = useCache();
  let loader;
  const initializeLoader = () => {
    const lazyLoader = new Proto(...options?.args ?? []);
    options?.extend?.(lazyLoader);
    return lazyLoader;
  };
  const load = (input, options2) => {
    const loadResource = async (url) => {
      if (!loader) {
        loader = initializeLoader();
      }
      if ("loadAsync" in loader) {
        const result = await loader.loadAsync(url, options2?.onProgress);
        return options2?.transform?.(result) ?? result;
      } else {
        return new Promise((resolve, reject) => {
          loader.load(url, (data) => resolve(options2?.transform?.(data) ?? data), (event) => options2?.onProgress?.(event), reject);
        });
      }
    };
    if (Array.isArray(input)) {
      const promises = input.map((url) => {
        return remember(() => loadResource(url), [Proto, url]);
      });
      const store = asyncWritable(Promise.all(promises));
      return store;
    } else if (typeof input === "string") {
      const promise = remember(() => loadResource(input), [Proto, input]);
      const store = asyncWritable(promise);
      return store;
    } else {
      const promises = Object.values(input).map((url) => {
        return remember(() => loadResource(url), [Proto, url]);
      });
      const store = asyncWritable(Promise.all(promises).then((results) => {
        return Object.fromEntries(Object.entries(input).map(([key2], i) => [key2, results[i]]));
      }));
      return store;
    }
  };
  const clear = (input) => {
    if (Array.isArray(input)) {
      input.forEach((url) => {
        clearCacheItem([Proto, url]);
      });
    } else if (typeof input === "string") {
      clearCacheItem([Proto, input]);
    } else {
      Object.entries(input).forEach(([key2, url]) => {
        clearCacheItem([Proto, key2, url]);
      });
    }
  };
  return {
    load,
    clear,
    loader
  };
}
const forwardEventHandlers = () => {
  const component = get_current_component();
  const dispatchingComponent = writable(void 0);
  watch(dispatchingComponent, (dispatchingComponent2) => {
    if (!dispatchingComponent2)
      return;
    Object.entries(component.$$.callbacks).forEach((callback) => {
      const [key2, value] = callback;
      if (key2 in dispatchingComponent2.$$.callbacks && Array.isArray(dispatchingComponent2.$$.callbacks[key2])) {
        dispatchingComponent2.$$.callbacks[key2].push(...value);
      } else {
        dispatchingComponent2.$$.callbacks[key2] = value;
      }
    });
  });
  return dispatchingComponent;
};
const buildSceneGraph = (object) => {
  const data = { nodes: {}, materials: {} };
  if (object) {
    object.traverse((obj) => {
      if (obj.name)
        data.nodes[obj.name] = obj;
      if (obj.material && !data.materials[obj.material.name])
        data.materials[obj.material.name] = obj.material;
    });
  }
  return data;
};
const defaultDracoLoaderInstances = {};
function useGltf(urlOrOptions, options) {
  const { renderer } = useThrelte();
  const opts = typeof urlOrOptions === "string" ? options : urlOrOptions;
  const loader = useLoader(GLTFLoader, {
    extend(loader2) {
      if (opts?.useDraco) {
        if (typeof opts.useDraco === "string" || typeof opts.useDraco === "boolean") {
          const path = typeof opts.useDraco === "string" ? opts.useDraco : "https://www.gstatic.com/draco/versioned/decoders/1.4.3/";
          if (!defaultDracoLoaderInstances[path]) {
            defaultDracoLoaderInstances[path] = new DRACOLoader().setDecoderPath(path);
          }
          loader2.setDRACOLoader(defaultDracoLoaderInstances[path]);
        } else {
          loader2.setDRACOLoader(opts.useDraco);
        }
      }
      if (opts?.useMeshopt) {
        loader2.setMeshoptDecoder(MeshoptDecoder);
      }
      if (opts?.ktxTranscoderPath) {
        const ktx2Loader = new KTX2Loader();
        ktx2Loader.setTranscoderPath(opts?.ktxTranscoderPath);
        ktx2Loader.detectSupport(renderer);
        loader2.setKTX2Loader(ktx2Loader);
      }
    }
  });
  const load = (url2) => {
    return loader.load(url2, {
      transform(result) {
        return {
          ...result,
          ...buildSceneGraph(result.scene)
        };
      }
    });
  };
  const url = typeof urlOrOptions === "string" ? urlOrOptions : void 0;
  if (url) {
    return load(url);
  } else {
    return {
      load
    };
  }
}
new Vector3();
new Vector3();
new Vector3();
const useMemo = (callback) => {
  let initialCallDone = false;
  const memoized = writable(callback());
  const memoize = (..._args) => {
    if (!initialCallDone) {
      initialCallDone = true;
      return;
    }
    memoized.set(callback());
  };
  return {
    ...memoized,
    memoize
  };
};
const ContactShadows = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "opacity",
    "width",
    "height",
    "blur",
    "far",
    "smooth",
    "resolution",
    "frames",
    "scale",
    "color",
    "depthWrite",
    "refresh"
  ]);
  let $depthMaterial, $$unsubscribe_depthMaterial;
  let $planeGeometry, $$unsubscribe_planeGeometry;
  let $renderTargetBlur, $$unsubscribe_renderTargetBlur;
  let $renderTarget, $$unsubscribe_renderTarget;
  let $blurPlane, $$unsubscribe_blurPlane;
  let $scaledHeight, $$unsubscribe_scaledHeight;
  let $scaledWidth, $$unsubscribe_scaledWidth;
  let $components, $$unsubscribe_components;
  let { opacity = 1 } = $$props;
  let { width = 1 } = $$props;
  let { height = 1 } = $$props;
  let { blur = 1 } = $$props;
  let { far = 10 } = $$props;
  let { smooth = true } = $$props;
  let { resolution = 512 } = $$props;
  let { frames = Infinity } = $$props;
  let { scale = 10 } = $$props;
  let { color = "#000000" } = $$props;
  let { depthWrite = false } = $$props;
  const { scene, renderer } = useThrelte();
  const scaledWidth = useMemo(() => {
    return width * (Array.isArray(scale) ? scale[0] : scale || 1);
  });
  $$unsubscribe_scaledWidth = subscribe(scaledWidth, (value) => $scaledWidth = value);
  const scaledHeight = useMemo(() => {
    return height * (Array.isArray(scale) ? scale[1] : scale || 1);
  });
  $$unsubscribe_scaledHeight = subscribe(scaledHeight, (value) => $scaledHeight = value);
  const renderTarget = useMemo(() => {
    const rt = new WebGLRenderTarget(resolution, resolution);
    rt.texture.generateMipmaps = false;
    rt.texture.colorSpace = renderer.outputColorSpace;
    return rt;
  });
  $$unsubscribe_renderTarget = subscribe(renderTarget, (value) => $renderTarget = value);
  const renderTargetBlur = useMemo(() => {
    const rt = new WebGLRenderTarget(resolution, resolution);
    rt.texture.generateMipmaps = false;
    return rt;
  });
  $$unsubscribe_renderTargetBlur = subscribe(renderTargetBlur, (value) => $renderTargetBlur = value);
  const planeGeometry = useMemo(() => {
    return new PlaneGeometry($scaledWidth, $scaledHeight).rotateX(Math.PI / 2);
  });
  $$unsubscribe_planeGeometry = subscribe(planeGeometry, (value) => $planeGeometry = value);
  const blurPlane = useMemo(() => {
    return new Mesh($planeGeometry);
  });
  $$unsubscribe_blurPlane = subscribe(blurPlane, (value) => $blurPlane = value);
  const depthMaterial = useMemo(() => {
    const dm = new MeshDepthMaterial({ depthTest: false, depthWrite: false });
    dm.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        uColor: {
          value: new Color(color).convertSRGBToLinear()
        }
      };
      shader.fragmentShader = "uniform vec3 uColor;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );", "vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );");
      shader.fragmentShader = shader.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);", "vec4(uColor,(1.0-fragCoordZ)*1.0);");
    };
    return dm;
  });
  $$unsubscribe_depthMaterial = subscribe(depthMaterial, (value) => $depthMaterial = value);
  const horizontalBlurMaterial = new ShaderMaterial({
    ...HorizontalBlurShader,
    depthTest: false
  });
  const verticalBlurMaterial = new ShaderMaterial({ ...VerticalBlurShader, depthTest: false });
  const shadowCamera = new OrthographicCamera(-$scaledWidth / 2, $scaledWidth / 2, $scaledHeight / 2, -$scaledHeight / 2, 0, far);
  shadowCamera.updateProjectionMatrix();
  const shadowMaterial = new MeshBasicMaterial({
    map: $renderTarget.texture,
    transparent: true,
    opacity,
    depthWrite
  });
  const blurShadows = (blur2) => {
    const bp = $blurPlane;
    bp.visible = true;
    bp.material = horizontalBlurMaterial;
    horizontalBlurMaterial.uniforms.tDiffuse.value = $renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = blur2 * 1 / 256;
    renderer.setRenderTarget($renderTargetBlur);
    renderer.render(bp, shadowCamera);
    bp.material = verticalBlurMaterial;
    verticalBlurMaterial.uniforms.tDiffuse.value = $renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = blur2 * 1 / 256;
    renderer.setRenderTarget($renderTarget);
    renderer.render(bp, shadowCamera);
    bp.visible = false;
  };
  const renderShadows = () => {
    const initialBackground = scene.background;
    scene.background = null;
    const initialOverrideMaterial = scene.overrideMaterial;
    scene.overrideMaterial = $depthMaterial;
    const initialClearAlpha = renderer.getClearAlpha();
    renderer.setClearAlpha(0);
    renderer.setRenderTarget($renderTarget);
    renderer.render(scene, shadowCamera);
    scene.overrideMaterial = initialOverrideMaterial;
    blurShadows(blur);
    if (smooth) blurShadows(blur * 0.4);
    renderer.setRenderTarget(null);
    scene.background = initialBackground;
    renderer.setClearAlpha(initialClearAlpha);
  };
  const refresh = () => {
    renderShadows();
  };
  let count = 0;
  useTask(() => {
    if (frames === Infinity || count < frames) {
      renderShadows();
      count += 1;
    }
  });
  onDestroy(() => {
    $renderTarget.dispose();
    $renderTargetBlur.dispose();
    $planeGeometry.dispose();
    $depthMaterial.dispose();
    horizontalBlurMaterial.dispose();
    verticalBlurMaterial.dispose();
    shadowMaterial.dispose();
  });
  const components = forwardEventHandlers();
  $$unsubscribe_components = subscribe(components, (value) => $components = value);
  if ($$props.opacity === void 0 && $$bindings.opacity && opacity !== void 0) $$bindings.opacity(opacity);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0) $$bindings.blur(blur);
  if ($$props.far === void 0 && $$bindings.far && far !== void 0) $$bindings.far(far);
  if ($$props.smooth === void 0 && $$bindings.smooth && smooth !== void 0) $$bindings.smooth(smooth);
  if ($$props.resolution === void 0 && $$bindings.resolution && resolution !== void 0) $$bindings.resolution(resolution);
  if ($$props.frames === void 0 && $$bindings.frames && frames !== void 0) $$bindings.frames(frames);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0) $$bindings.scale(scale);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.depthWrite === void 0 && $$bindings.depthWrite && depthWrite !== void 0) $$bindings.depthWrite(depthWrite);
  if ($$props.refresh === void 0 && $$bindings.refresh && refresh !== void 0) $$bindings.refresh(refresh);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      scaledWidth.memoize([width, scale]);
    }
    {
      scaledHeight.memoize(height, scale);
    }
    {
      renderTarget.memoize(resolution);
    }
    {
      renderTargetBlur.memoize(resolution);
    }
    {
      planeGeometry.memoize($scaledWidth, $scaledHeight);
    }
    {
      blurPlane.memoize($planeGeometry);
    }
    {
      depthMaterial.memoize(color);
    }
    $$rendered = `${validate_component(T.Group, "T.Group").$$render(
      $$result,
      Object.assign({}, $$restProps, { this: $components }),
      {
        this: ($$value) => {
          $components = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ ref }) => {
          return `${validate_component(T.Group, "T.Group").$$render($$result, { "rotation.x": Math.PI / 2 }, {}, {
            default: () => {
              return `${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  "scale.y": -1,
                  "rotation.x": -Math.PI / 2,
                  material: shadowMaterial,
                  geometry: $planeGeometry
                },
                {},
                {}
              )} ${validate_component(T, "T").$$render($$result, { is: shadowCamera, manual: true }, {}, {})} ${slots.default ? slots.default({ ref }) : ``}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_depthMaterial();
  $$unsubscribe_planeGeometry();
  $$unsubscribe_renderTargetBlur();
  $$unsubscribe_renderTarget();
  $$unsubscribe_blurPlane();
  $$unsubscribe_scaledHeight();
  $$unsubscribe_scaledWidth();
  $$unsubscribe_components();
  return $$rendered;
});
const revision = Number.parseInt(REVISION.replace("dev", ""));
const vertexShader = (
  /*glsl*/
  `
  varying vec3 localPosition;
  varying vec4 worldPosition;

  uniform vec3 worldCamProjPosition;
	uniform vec3 worldPlanePosition;
	uniform float fadeDistance;
	uniform bool infiniteGrid;
	uniform bool followCamera;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	void main() {
		localPosition = vec3(
		  position[coord0],
			position[coord1],
			position[coord2]
		);

		if (infiniteGrid) {
		  localPosition *= 1.0 + fadeDistance;
		}

		worldPosition = modelMatrix * vec4(localPosition, 1.0);
		if (followCamera) {
		  worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
      localPosition = (inverse(modelMatrix) * worldPosition).xyz;
		}

		gl_Position = projectionMatrix * viewMatrix * worldPosition;
	}
`
);
const fragmentShader = (
  /*glsl*/
  `
  #define PI 3.141592653589793

	varying vec3 localPosition;
	varying vec4 worldPosition;

	uniform vec3 worldCamProjPosition;
	uniform float cellSize;
	uniform float sectionSize;
	uniform vec3 cellColor;
	uniform vec3 sectionColor;
	uniform float fadeDistance;
	uniform float fadeStrength;
	uniform float cellThickness;
	uniform float sectionThickness;
	uniform vec3 backgroundColor;
	uniform float backgroundOpacity;

	uniform bool infiniteGrid;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	// 0 - default; 1 - lines; 2 - circles; 3 - polar
	uniform int gridType;

  // lineGrid coord for lines
	uniform int lineGridCoord;

	// circlegrid max radius
	uniform float circleGridMaxRadius;

	// polar grid dividers
	uniform float polarCellDividers;
	uniform float polarSectionDividers;

	float getSquareGrid(float size, float thickness, vec3 localPos) {
		vec2 coord = localPos.xy / size;

		vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
		float line = min(grid.x, grid.y) + 1.0 - thickness;

		return 1.0 - min(line, 1.0);
	}

	float getLinesGrid(float size, float thickness, vec3 localPos) {
		float coord = localPos[lineGridCoord] / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		return 1.0 - min(line, 1.0);
	}

	float getCirclesGrid(float size, float thickness, vec3 localPos) {
		float coord = length(localPos.xy) / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		if (!infiniteGrid && circleGridMaxRadius > 0. && coord > circleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.0);
	}

	float getPolarGrid(float size, float thickness, float polarDividers, vec3 localPos) {
		float rad = length(localPos.xy) / size;
		vec2 coord = vec2(rad, atan(localPos.x, localPos.y) * polarDividers / PI) ;

		vec2 wrapped = vec2(coord.x, fract(coord.y / (2.0 * polarDividers)) * (2.0 * polarDividers));
		vec2 coordWidth = fwidth(coord);
		vec2 wrappedWidth = fwidth(wrapped);
		vec2 width = (coord.y < -polarDividers * 0.5 || coord.y > polarDividers * 0.5 ? wrappedWidth : coordWidth) * (1.+thickness*0.25);

		// Compute anti-aliased world-space grid lines
		vec2 grid = abs(fract(coord - 0.5) - 0.5) / width;
		float line = min(grid.x, grid.y);

if (!infiniteGrid && circleGridMaxRadius > 0.0 && rad > circleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.0);
	}

	void main() {
		float g1 = 0.0;
		float g2 = 0.0;

		vec3 localPos = vec3(localPosition[coord0], localPosition[coord1], localPosition[coord2]);

		if (gridType == 0) {
			g1 = getSquareGrid(cellSize, cellThickness, localPos);
			g2 = getSquareGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 1) {
			g1 = getLinesGrid(cellSize, cellThickness, localPos);
			g2 = getLinesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 2) {
			g1 = getCirclesGrid(cellSize, cellThickness, localPos);
			g2 = getCirclesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 3) {
			g1 = getPolarGrid(cellSize, cellThickness, polarCellDividers, localPos);
			g2 = getPolarGrid(sectionSize, sectionThickness, polarSectionDividers, localPos);
		}

		float dist = distance(worldCamProjPosition, worldPosition.xyz);
		float d = 1.0 - min(dist / fadeDistance, 1.0);
		float fadeFactor = pow(d, fadeStrength) * 0.95;

		vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

		if (backgroundOpacity > 0.0) {
			float linesAlpha = clamp((g1 + g2) * fadeFactor, 0.0,1.0);
			vec3 finalColor = mix(backgroundColor, color, linesAlpha);
			float blendedAlpha = max(linesAlpha, backgroundOpacity * fadeFactor);
			gl_FragColor = vec4(finalColor, blendedAlpha);

		} else {
			gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
			gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
		}

		if (gl_FragColor.a <= 0.0) {
		  discard;
		}

		#include <tonemapping_fragment>
		#include <${revision < 154 ? "encodings_fragment" : "colorspace_fragment"}>
	}
`
);
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "cellColor",
    "sectionColor",
    "cellSize",
    "backgroundColor",
    "backgroundOpacity",
    "sectionSize",
    "plane",
    "gridSize",
    "followCamera",
    "infiniteGrid",
    "fadeDistance",
    "fadeStrength",
    "cellThickness",
    "sectionThickness",
    "side",
    "type",
    "axis",
    "maxRadius",
    "cellDividers",
    "sectionDividers",
    "ref"
  ]);
  let $component, $$unsubscribe_component;
  let { cellColor = "#000000" } = $$props;
  let { sectionColor = "#0000ee" } = $$props;
  let { cellSize = 1 } = $$props;
  let { backgroundColor = "#dadada" } = $$props;
  let { backgroundOpacity = 0 } = $$props;
  let { sectionSize = 10 } = $$props;
  let { plane = "xz" } = $$props;
  let { gridSize = [20, 20] } = $$props;
  let { followCamera = false } = $$props;
  let { infiniteGrid = false } = $$props;
  let { fadeDistance = 100 } = $$props;
  let { fadeStrength = 1 } = $$props;
  let { cellThickness = 1 } = $$props;
  let { sectionThickness = 2 } = $$props;
  let { side = DoubleSide } = $$props;
  let { type = "grid" } = $$props;
  let { axis = "x" } = $$props;
  let { maxRadius = 0 } = $$props;
  let { cellDividers = 6 } = $$props;
  let { sectionDividers = 2 } = $$props;
  let { ref } = $$props;
  const { invalidate, camera } = useThrelte();
  const gridPlane = new Plane();
  const upVector = new Vector3(0, 1, 0);
  const zeroVector = new Vector3(0, 0, 0);
  const axisToInt = { x: 0, y: 1, z: 2 };
  const planeToAxes = { xz: "xzy", xy: "xyz", zy: "zyx" };
  const gridType = { grid: 0, lines: 1, circular: 2, polar: 3 };
  const uniforms = {
    cellSize: { value: cellSize },
    sectionSize: { value: sectionSize },
    cellColor: { value: new Color(cellColor) },
    sectionColor: { value: new Color(sectionColor) },
    backgroundColor: { value: new Color(backgroundColor) },
    backgroundOpacity: { value: backgroundOpacity },
    fadeDistance: { value: fadeDistance },
    fadeStrength: { value: fadeStrength },
    cellThickness: { value: cellThickness },
    sectionThickness: { value: sectionThickness },
    infiniteGrid: { value: infiniteGrid },
    followCamera: { value: followCamera },
    coord0: { value: 0 },
    coord1: { value: 2 },
    coord2: { value: 1 },
    gridType: { value: gridType.grid },
    lineGridCoord: { value: axisToInt[axis] },
    circleGridMaxRadius: { value: maxRadius },
    polarCellDividers: { value: cellDividers },
    polarSectionDividers: { value: sectionDividers },
    worldCamProjPosition: { value: new Vector3() },
    worldPlanePosition: { value: new Vector3() }
  };
  useTask(() => {
    gridPlane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(ref.matrixWorld);
    const material = ref.material;
    const worldCamProjPosition = material.uniforms.worldCamProjPosition;
    const worldPlanePosition = material.uniforms.worldPlanePosition;
    gridPlane.projectPoint(camera.current.position, worldCamProjPosition.value);
    worldPlanePosition.value.set(0, 0, 0).applyMatrix4(ref.matrixWorld);
    invalidate();
  });
  const component = forwardEventHandlers();
  $$unsubscribe_component = subscribe(component, (value) => $component = value);
  if ($$props.cellColor === void 0 && $$bindings.cellColor && cellColor !== void 0) $$bindings.cellColor(cellColor);
  if ($$props.sectionColor === void 0 && $$bindings.sectionColor && sectionColor !== void 0) $$bindings.sectionColor(sectionColor);
  if ($$props.cellSize === void 0 && $$bindings.cellSize && cellSize !== void 0) $$bindings.cellSize(cellSize);
  if ($$props.backgroundColor === void 0 && $$bindings.backgroundColor && backgroundColor !== void 0) $$bindings.backgroundColor(backgroundColor);
  if ($$props.backgroundOpacity === void 0 && $$bindings.backgroundOpacity && backgroundOpacity !== void 0) $$bindings.backgroundOpacity(backgroundOpacity);
  if ($$props.sectionSize === void 0 && $$bindings.sectionSize && sectionSize !== void 0) $$bindings.sectionSize(sectionSize);
  if ($$props.plane === void 0 && $$bindings.plane && plane !== void 0) $$bindings.plane(plane);
  if ($$props.gridSize === void 0 && $$bindings.gridSize && gridSize !== void 0) $$bindings.gridSize(gridSize);
  if ($$props.followCamera === void 0 && $$bindings.followCamera && followCamera !== void 0) $$bindings.followCamera(followCamera);
  if ($$props.infiniteGrid === void 0 && $$bindings.infiniteGrid && infiniteGrid !== void 0) $$bindings.infiniteGrid(infiniteGrid);
  if ($$props.fadeDistance === void 0 && $$bindings.fadeDistance && fadeDistance !== void 0) $$bindings.fadeDistance(fadeDistance);
  if ($$props.fadeStrength === void 0 && $$bindings.fadeStrength && fadeStrength !== void 0) $$bindings.fadeStrength(fadeStrength);
  if ($$props.cellThickness === void 0 && $$bindings.cellThickness && cellThickness !== void 0) $$bindings.cellThickness(cellThickness);
  if ($$props.sectionThickness === void 0 && $$bindings.sectionThickness && sectionThickness !== void 0) $$bindings.sectionThickness(sectionThickness);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.axis === void 0 && $$bindings.axis && axis !== void 0) $$bindings.axis(axis);
  if ($$props.maxRadius === void 0 && $$bindings.maxRadius && maxRadius !== void 0) $$bindings.maxRadius(maxRadius);
  if ($$props.cellDividers === void 0 && $$bindings.cellDividers && cellDividers !== void 0) $$bindings.cellDividers(cellDividers);
  if ($$props.sectionDividers === void 0 && $$bindings.sectionDividers && sectionDividers !== void 0) $$bindings.sectionDividers(sectionDividers);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        const axes = planeToAxes[plane];
        const c0 = axes.charAt(0);
        const c1 = axes.charAt(1);
        const c2 = axes.charAt(2);
        uniforms.coord0.value = axisToInt[c0];
        uniforms.coord1.value = axisToInt[c1];
        uniforms.coord2.value = axisToInt[c2];
      }
    }
    uniforms.cellSize.value = cellSize;
    uniforms.sectionSize.value = sectionSize;
    uniforms.backgroundOpacity.value = backgroundOpacity;
    uniforms.fadeDistance.value = fadeDistance;
    uniforms.fadeStrength.value = fadeStrength;
    uniforms.cellThickness.value = cellThickness;
    uniforms.sectionThickness.value = sectionThickness;
    uniforms.followCamera.value = followCamera;
    uniforms.infiniteGrid.value = infiniteGrid;
    {
      {
        switch (type) {
          case "grid": {
            uniforms.gridType.value = gridType.grid;
            break;
          }
          case "lines": {
            uniforms.gridType.value = gridType.lines;
            uniforms.lineGridCoord.value = axisToInt[axis];
            break;
          }
          case "circular": {
            uniforms.gridType.value = gridType.circular;
            uniforms.circleGridMaxRadius.value = maxRadius;
            break;
          }
          case "polar": {
            uniforms.gridType.value = gridType.polar;
            uniforms.circleGridMaxRadius.value = maxRadius;
            uniforms.polarCellDividers.value = cellDividers;
            uniforms.polarSectionDividers.value = sectionDividers;
            break;
          }
        }
        invalidate();
      }
    }
    {
      uniforms.cellColor.value.set(cellColor);
    }
    {
      uniforms.sectionColor.value.set(sectionColor);
    }
    {
      uniforms.backgroundColor.value.set(backgroundColor);
    }
    $$rendered = `  ${validate_component(T.Mesh, "T.Mesh").$$render(
      $$result,
      Object.assign({}, { frustumCulled: false }, $$restProps, { this: $component }, { ref }),
      {
        this: ($$value) => {
          $component = $$value;
          $$settled = false;
        },
        ref: ($$value) => {
          ref = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ ref: ref2 }) => {
          return `${validate_component(T.ShaderMaterial, "T.ShaderMaterial").$$render(
            $$result,
            {
              fragmentShader,
              vertexShader,
              uniforms,
              transparent: true,
              side
            },
            {},
            {}
          )} ${slots.default ? slots.default({ ref: ref2 }) : ` ${validate_component(T.PlaneGeometry, "T.PlaneGeometry").$$render(
            $$result,
            {
              args: typeof gridSize == "number" ? [gridSize, gridSize] : gridSize
            },
            {},
            {}
          )} `}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_component();
  return $$rendered;
});
const useControlsContext = () => {
  return useThrelteUserContext("threlte-controls", {
    orbitControls: writable(void 0),
    trackballControls: writable(void 0)
  });
};
const OrbitControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref"]);
  let $parent, $$unsubscribe_parent;
  let $component, $$unsubscribe_component;
  const parent = useParent();
  $$unsubscribe_parent = subscribe(parent, (value) => $parent = value);
  const isCamera2 = (p) => {
    return p.isCamera;
  };
  const { renderer, invalidate } = useThrelte();
  if (!isCamera2($parent)) {
    throw new Error("Parent missing: <OrbitControls> need to be a child of a <Camera>");
  }
  const ref = new OrbitControls$1($parent, renderer.domElement);
  const { start, stop } = useTask(ref.update, { autoStart: false, autoInvalidate: false });
  const component = forwardEventHandlers();
  $$unsubscribe_component = subscribe(component, (value) => $component = value);
  const { orbitControls } = useControlsContext();
  orbitControls.set(ref);
  onDestroy(() => orbitControls.set(void 0));
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if ($$restProps.autoRotate || $$restProps.enableDamping) start();
        else stop();
      }
    }
    $$rendered = `${validate_component(T, "T").$$render(
      $$result,
      Object.assign({}, { is: ref }, $$restProps, { this: $component }),
      {
        this: ($$value) => {
          $component = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ ref: ref2 }) => {
          return `${slots.default ? slots.default({ ref: ref2 }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_parent();
  $$unsubscribe_component();
  return $$rendered;
});
new Matrix4();
new Matrix4();
new Mesh();
`
	  #include <common>
    ${ShaderChunk.logdepthbuf_pars_vertex}
    ${ShaderChunk.fog_pars_vertex}

    attribute vec3 previous;
    attribute vec3 next;
    attribute float side;
    attribute float width;
    attribute float counters;

    uniform vec2 resolution;
    uniform float lineWidth;
    uniform vec3 color;
    uniform float opacity;
    uniform float sizeAttenuation;
    uniform float scaleDown;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    vec2 intoScreen(vec4 i) {
        return resolution * (0.5 * i.xy / i.w + 0.5);
    }

    void main() {
        float aspect = resolution.y / resolution.x;

        mat4 m = projectionMatrix * modelViewMatrix;

        vec4 currentClip = m * vec4( position, 1.0 );
        vec4 prevClip = m * vec4( previous, 1.0 );
        vec4 nextClip = m * vec4( next, 1.0 );

        vec4 currentNormed = currentClip / currentClip.w;
        vec4 prevNormed = prevClip / prevClip.w;
        vec4 nextNormed = nextClip / nextClip.w;

        vec2 currentScreen = intoScreen(currentNormed);
        vec2 prevScreen = intoScreen(prevNormed);
        vec2 nextScreen = intoScreen(nextNormed);

        float actualWidth = lineWidth * width;

        vec2 dir;
        if(nextScreen == currentScreen) {
            dir = normalize( currentScreen - prevScreen );
        } else if(prevScreen == currentScreen) {
            dir = normalize( nextScreen - currentScreen );
        } else {
            vec2 inDir = currentScreen - prevScreen;
            vec2 outDir = nextScreen - currentScreen;
            vec2 fullDir = nextScreen - prevScreen;

            if(length(fullDir) > 0.0) {
                dir = normalize(fullDir);
            } else if(length(inDir) > 0.0){
                dir = normalize(inDir);
            } else {
                dir = normalize(outDir);
            }
        }

        vec2 normal = vec2(-dir.y, dir.x);

        if(sizeAttenuation != 0.0) {
            normal /= currentClip.w;
            normal *= min(resolution.x, resolution.y);
        }

        if (scaleDown > 0.0) {
            float dist = length(nextNormed - prevNormed);
            normal *= smoothstep(0.0, scaleDown, dist);
        }

        vec2 offsetInScreen = actualWidth * normal * side * 0.5;

        vec2 withOffsetScreen = currentScreen + offsetInScreen;
        vec3 withOffsetNormed = vec3((2.0 * withOffsetScreen/resolution - 1.0), currentNormed.z);

        vCounters = counters;
        vColor = vec4( color, opacity );
        vUV = uv;

        gl_Position = currentClip.w * vec4(withOffsetNormed, 1.0);

        ${ShaderChunk.logdepthbuf_vertex}
        ${ShaderChunk.fog_vertex}
    }
`;
`
uniform vec3 glowColor;
uniform float falloffAmount;
uniform float glowSharpness;
uniform float glowInternalRadius;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
	// Normal
	vec3 normal = normalize(vNormal);
	if(!gl_FrontFacing)
			normal *= - 1.0;
	vec3 viewDirection = normalize(cameraPosition - vPosition);
	float fresnel = dot(viewDirection, normal);
	fresnel = pow(fresnel, glowInternalRadius + 0.1);
	float falloff = smoothstep(0., falloffAmount, fresnel);
	float fakeGlow = fresnel;
	fakeGlow += fresnel * glowSharpness;
	fakeGlow *= falloff;
	gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., 1.0));

	${ShaderChunk.tonemapping_fragment}
	${ShaderChunk.colorspace_fragment}
}`;
`
uniform sampler2D pointTexture;
uniform float fade;
uniform float opacity;

varying vec3 vColor;
void main() {
	float pointOpacity = 1.0;
	if (fade == 1.0) {
		float d = distance(gl_PointCoord, vec2(0.5, 0.5));
		pointOpacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
	}
	gl_FragColor = vec4(vColor, pointOpacity * opacity);

	${ShaderChunk.tonemapping_fragment}
	${ShaderChunk.colorspace_fragment}
}`;
`#define ENVMAP_TYPE_CUBE_UV
precision highp isampler2D;
precision highp usampler2D;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying mat4 vModelMatrixInverse;

#ifdef USE_INSTANCING_COLOR
	varying vec3 vInstanceColor;
#endif

#ifdef ENVMAP_TYPE_CUBEM
	uniform samplerCube envMap;
#else
	uniform sampler2D envMap;
#endif

uniform float bounces;
${shaderStructs}
${shaderIntersectFunction}
uniform BVH bvh;
uniform float ior;
uniform bool correctMips;
uniform vec2 resolution;
uniform float fresnel;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrixInverse;
uniform mat4 viewMatrixInverse;
uniform float aberrationStrength;
uniform vec3 color;

float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
	return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
}

vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
	vec3 rayOrigin = ro;
	vec3 rayDirection = rd;
	rayDirection = refract(rayDirection, normal, 1.0 / ior);
	rayOrigin = vWorldPosition + rayDirection * 0.001;
	rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
	rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
	for(float i = 0.0; i < bounces; i++) {
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
		vec3 tempDir = refract(rayDirection, faceNormal, ior);
		if (length(tempDir) != 0.0) {
			rayDirection = tempDir;
			break;
		}
		rayDirection = reflect(rayDirection, faceNormal);
		rayOrigin = hitPos + rayDirection * 0.01;
	}
	rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
	return rayDirection;
}

#include <common>
#include <cube_uv_reflection_fragment>

#ifdef ENVMAP_TYPE_CUBEM
	vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
		return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
	}
#else
	vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
		vec2 uvv = equirectUv( rayDirection );
		vec2 smoothUv = equirectUv( directionCamPerfect );
		return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
	}
#endif

void main() {
	vec2 uv = gl_FragCoord.xy / resolution;
	vec3 directionCamPerfect = (projectionMatrixInverse * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
	directionCamPerfect = (viewMatrixInverse * vec4(directionCamPerfect, 0.0)).xyz;
	directionCamPerfect = normalize(directionCamPerfect);
	vec3 normal = vNormal;
	vec3 rayOrigin = cameraPosition;
	vec3 rayDirection = normalize(vWorldPosition - cameraPosition);
	vec3 finalColor;
	#ifdef CHROMATIC_ABERRATIONS
		vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
		#ifdef FAST_CHROMA
			vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
			vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
		#else
			vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), vModelMatrixInverse);
			vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), vModelMatrixInverse);
		#endif
		float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
		float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
		float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
		finalColor = vec3(finalColorR, finalColorG, finalColorB);
	#else
		rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
		finalColor = textureGradient(envMap, rayDirection, directionCamPerfect).rgb;
	#endif

	finalColor *= color;
	#ifdef USE_INSTANCING_COLOR
		finalColor *= vInstanceColor;
	#endif

	vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
	float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
	gl_FragColor = vec4(mix(finalColor, vec3(1.0), nFresnel), 1.0);
	${ShaderChunk.tonemapping_fragment}
	${ShaderChunk.colorspace_fragment}
}`;
const isLaunched = writable(false);
const launchTime = writable(0);
const launchDirection = writable({ x: 1, y: 0, z: 0 });
const launchVelocity = writable(1);
function resetLaunch() {
  isLaunched.set(false);
  launchTime.set(0);
}
const orbitPosition = writable(new Vector3());
const orbitVelocity = writable(new Vector3());
const orbitStartTime = writable(0);
const isOrbiting = writable(false);
const isPaused = writable(false);
function startOrbit(initialPosition, initialVelocity, startTime) {
  orbitPosition.set(initialPosition);
  orbitVelocity.set(initialVelocity);
  orbitStartTime.set(startTime);
  isOrbiting.set(true);
}
function resetOrbit() {
  isOrbiting.set(false);
  orbitStartTime.set(0);
}
const selectedModel = writable("Virus");
const autoRotate = writable(true);
const Cat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref"]);
  let $component, $$unsubscribe_component;
  const ref = new Group();
  const gltf = useGltf("models/cat-transformed.glb", { useDraco: true });
  const component = forwardEventHandlers();
  $$unsubscribe_component = subscribe(component, (value) => $component = value);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  ${validate_component(T, "T").$$render(
      $$result,
      Object.assign({}, { is: ref }, { dispose: false }, $$restProps, { this: $component }),
      {
        this: ($$value) => {
          $component = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${function(__value) {
            if (is_promise(__value)) {
              __value.then(null, noop);
              return ` ${slots.fallback ? slots.fallback({}) : ``} `;
            }
            return function(gltf2) {
              return ` ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.Cat.geometry,
                  material: gltf2.materials.Cat
                },
                {},
                {}
              )} `;
            }(__value);
          }(gltf)} ${slots.default ? slots.default({ ref }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_component();
  return $$rendered;
});
const Virus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref"]);
  let $component, $$unsubscribe_component;
  const ref = new Group();
  const gltf = useGltf("models/virus-transformed.glb", { useDraco: true });
  const component = forwardEventHandlers();
  $$unsubscribe_component = subscribe(component, (value) => $component = value);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  ${validate_component(T, "T").$$render(
      $$result,
      Object.assign({}, { is: ref }, { dispose: false }, $$restProps, { this: $component }),
      {
        this: ($$value) => {
          $component = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${function(__value) {
            if (is_promise(__value)) {
              __value.then(null, noop);
              return ` ${slots.fallback ? slots.fallback({}) : ``} `;
            }
            return function(gltf2) {
              return ` ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.aileron_left.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.aileron_right.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.door_left.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.door_right.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.elevator.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.fairing_front.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.fairing_left.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.fairing_right.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.glareshield.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.prop_fast.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.925490"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.rudder.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.spinner.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_cover2_left.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_cover2_right.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_cover_left.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_cover_right.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_handle_left.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_handle_right.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_left.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.stick_right.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.strut_front.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.strut_left.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.strut_right.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.w_shaft.geometry,
                  material: gltf2.materials["0.517647_0.517647_0.517647_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.400000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_1.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.800000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh2_mesh.geometry,
                  material: gltf2.materials["0.800000_0.592157_0.145098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh2_mesh_1.geometry,
                  material: gltf2.materials["0.800000_0.592157_0.145098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh4_mesh.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh4_mesh_1.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh6_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh6_mesh_1.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh6_mesh_2.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh6_mesh_3.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh6_mesh_4.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh11_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh11_mesh_1.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh11_mesh_2.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh11_mesh_3.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh11_mesh_4.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh16_mesh.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh16_mesh_1.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh16_mesh_2.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh16_mesh_3.geometry,
                  material: gltf2.materials["0.019608_0.019608_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh20_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh20_mesh_1.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_1.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_2.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_3.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_4.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_5.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_6.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_7.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_8.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_9.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_10.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_11.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_12.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_13.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_14.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_15.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_16.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_17.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_18.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_19.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_20.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_21.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_22.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_23.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh22_mesh_24.geometry,
                  material: gltf2.materials["0.250980_0.250980_0.250980_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh_1.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh_2.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh_3.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh_4.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh_5.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh55_mesh_6.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_1.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_2.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_3.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_4.geometry,
                  material: gltf2.materials["0.035294_0.035294_0.035294_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_5.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_6.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_7.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh62_mesh_8.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh75_mesh.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh75_mesh_1.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh77_mesh.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh77_mesh_1.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh79_mesh.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh79_mesh_1.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh81_mesh.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh81_mesh_1.geometry,
                  material: gltf2.materials["1.000000_1.000000_1.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh94_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.800000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh94_mesh_1.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.400000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh97_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh97_mesh_1.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh97_mesh_2.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh100_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh100_mesh_1.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh100_mesh_2.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh103_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh103_mesh_1.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh103_mesh_2.geometry,
                  material: gltf2.materials["0.800000_0.800000_0.800000_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh106_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.800000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh106_mesh_1.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.400000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh108_mesh.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.800000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh108_mesh_1.geometry,
                  material: gltf2.materials["0.000000_0.000000_0.000000_0.000000_0.400000"]
                },
                {},
                {}
              )} `;
            }(__value);
          }(gltf)} ${slots.default ? slots.default({ ref }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_component();
  return $$rendered;
});
const Ribs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ref"]);
  let $component, $$unsubscribe_component;
  const ref = new Group();
  const gltf = useGltf("models/ribs-transformed.glb", { useDraco: true });
  const component = forwardEventHandlers();
  $$unsubscribe_component = subscribe(component, (value) => $component = value);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  ${validate_component(T, "T").$$render(
      $$result,
      Object.assign({}, { is: ref }, { dispose: false }, $$restProps, { this: $component }),
      {
        this: ($$value) => {
          $component = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${function(__value) {
            if (is_promise(__value)) {
              __value.then(null, noop);
              return ` ${slots.fallback ? slots.fallback({}) : ``} `;
            }
            return function(gltf2) {
              return ` ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_1.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_2.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_3.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_4.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_5.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_6.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_7.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_8.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_9.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_10.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_11.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_12.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_13.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_14.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_15.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_16.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_17.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_18.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_19.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_20.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_21.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_22.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_23.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_24.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_25.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_26.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_27.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_28.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_29.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_30.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_31.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_32.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_33.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_34.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_35.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_36.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_37.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_38.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_39.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_40.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_41.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_42.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_43.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_44.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_45.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_46.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_47.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_48.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_49.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_50.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_51.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_52.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_53.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_54.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_55.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_56.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_57.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_58.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_59.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_60.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_61.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_62.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_63.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_64.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_65.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_66.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_67.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_68.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_69.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_70.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_71.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_72.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_73.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_74.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_75.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_76.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_77.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_78.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_79.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_80.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_81.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_82.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_83.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_84.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_85.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_86.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_87.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_88.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_89.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_90.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_91.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_92.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_93.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_94.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_95.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_96.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_97.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_98.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_99.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_100.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_101.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_102.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_103.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_104.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_105.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_106.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_107.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_108.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_109.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_110.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_111.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_112.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_113.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_114.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_115.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_116.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_117.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_118.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_119.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_120.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_121.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_122.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_123.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_124.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_125.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_126.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_127.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_128.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_129.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_130.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_131.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_132.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_133.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_134.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_135.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_136.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_137.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_138.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_139.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_140.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_141.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_142.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_143.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_144.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_145.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_146.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_147.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_148.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_149.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_150.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_151.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_152.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_153.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_154.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_155.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_156.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_157.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_158.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_159.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_160.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_161.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_162.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_163.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_164.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_165.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_166.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_167.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_168.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_169.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_170.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_171.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_172.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_173.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_174.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_175.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_176.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_177.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_178.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_179.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_180.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_181.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_182.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_183.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_184.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_185.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_186.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_187.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_188.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_189.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_190.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_191.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_192.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_193.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_194.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_195.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_196.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_197.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_198.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_199.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_200.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_201.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_202.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_203.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_204.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_205.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_206.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_207.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_208.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_209.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_210.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_211.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_212.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_213.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_214.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_215.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_216.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_217.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_218.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_219.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_220.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_221.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_222.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_223.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_224.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_225.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_226.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_227.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_228.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_229.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_230.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_231.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_232.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_233.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_234.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_235.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_236.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_237.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_238.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_239.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_240.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_241.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_242.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_243.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_244.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_245.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_246.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_247.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_248.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_249.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_250.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_251.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_252.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_253.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_254.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_255.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_256.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_257.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_258.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_259.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_260.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_261.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_262.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_263.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_264.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_265.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_266.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_267.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_268.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_269.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_270.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_271.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_272.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_273.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_274.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_275.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_276.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_277.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_278.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_279.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_280.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_281.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_282.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_283.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_284.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_285.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_286.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_287.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_288.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_289.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_290.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_291.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_292.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_293.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_294.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_295.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_296.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_297.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_298.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_299.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_300.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_301.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_302.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_303.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_304.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_305.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_306.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_307.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_308.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_309.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_310.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_311.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_312.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_313.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_314.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_315.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_316.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_317.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_318.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_319.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_320.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_321.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_322.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_323.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_324.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_325.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_326.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_327.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_328.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_329.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_330.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_331.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_332.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_333.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_334.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_335.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_336.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_337.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_338.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_339.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_340.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_341.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_342.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_343.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_344.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_345.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_346.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_347.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_348.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_349.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_350.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_351.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_352.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_353.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_354.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_355.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_356.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_357.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_358.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_359.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_360.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_361.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_362.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_363.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_364.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_365.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_366.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_367.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_368.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_369.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_370.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_371.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_372.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_373.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_374.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_375.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_376.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_377.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_378.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_379.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_380.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_381.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_382.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_383.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_384.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_385.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_386.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_387.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_388.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_389.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_390.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_391.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_392.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_393.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_394.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_395.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_396.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_397.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_398.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_399.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_400.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_401.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_402.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_403.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_404.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_405.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_406.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_407.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_408.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_409.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_410.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_411.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_412.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_413.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_414.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_415.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_416.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_417.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_418.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_419.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} ${validate_component(T.Mesh, "T.Mesh").$$render(
                $$result,
                {
                  geometry: gltf2.nodes.mesh0_mesh_420.geometry,
                  material: gltf2.materials["0.564706_0.811765_0.945098_0.000000_0.000000"]
                },
                {},
                {}
              )} `;
            }(__value);
          }(gltf)} ${slots.default ? slots.default({ ref }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_component();
  return $$rendered;
});
const ModelLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ModelComponent;
  let adjustment;
  let $selectedModel, $$unsubscribe_selectedModel;
  $$unsubscribe_selectedModel = subscribe(selectedModel, (value) => $selectedModel = value);
  let { position } = $$props;
  let { scale } = $$props;
  let { rotation } = $$props;
  const models = { Cat, Virus, Ribs };
  const modelAdjustments = {
    Cat: {
      scale: 0.4,
      rotation: [Math.PI / 2, 0, 0]
    },
    Virus: { scale: 1, rotation: [0, 0, 0] },
    Ribs: { scale: 1, rotation: [0, 0, 0] }
  };
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0) $$bindings.scale(scale);
  if ($$props.rotation === void 0 && $$bindings.rotation && rotation !== void 0) $$bindings.rotation(rotation);
  ModelComponent = models[$selectedModel];
  adjustment = modelAdjustments[$selectedModel];
  $$unsubscribe_selectedModel();
  return `  ${ModelComponent ? `${validate_component(T.Group, "T.Group").$$render(
    $$result,
    {
      position,
      scale: [
        scale * adjustment.scale,
        scale * adjustment.scale,
        scale * adjustment.scale
      ],
      rotation: [
        rotation[0] + adjustment.rotation[0],
        rotation[1] + adjustment.rotation[1],
        rotation[2] + adjustment.rotation[2]
      ]
    },
    {},
    {
      default: () => {
        return `${validate_component(ModelComponent || missing_component, "svelte:component").$$render($$result, {}, {}, {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        })}`;
      }
    }
  )}` : ``}`;
});
const OrbitTrail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let material;
  let $geometry, $$unsubscribe_geometry;
  let { maxPoints = 1e3 } = $$props;
  let { fadeOut = true } = $$props;
  let { color = "#FFFFFF" } = $$props;
  const points = writable([]);
  const geometry = derived(points, ($points) => {
    const geometry2 = new BufferGeometry();
    geometry2.setAttribute("position", new Float32BufferAttribute($points.flat(), 3));
    return geometry2;
  });
  $$unsubscribe_geometry = subscribe(geometry, (value) => $geometry = value);
  function addPoint(x, y, z) {
    points.update((p) => {
      if (p.length >= maxPoints) p.shift();
      return [...p, [x, y, z]];
    });
  }
  function reset() {
    points.set([]);
  }
  if ($$props.maxPoints === void 0 && $$bindings.maxPoints && maxPoints !== void 0) $$bindings.maxPoints(maxPoints);
  if ($$props.fadeOut === void 0 && $$bindings.fadeOut && fadeOut !== void 0) $$bindings.fadeOut(fadeOut);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.addPoint === void 0 && $$bindings.addPoint && addPoint !== void 0) $$bindings.addPoint(addPoint);
  if ($$props.reset === void 0 && $$bindings.reset && reset !== void 0) $$bindings.reset(reset);
  material = new LineBasicMaterial({
    color: new Color(color),
    vertexColors: fadeOut
  });
  $$unsubscribe_geometry();
  return `  ${validate_component(T.Line, "T.Line").$$render($$result, { geometry: $geometry, material }, {}, {})}`;
});
const PLANET_RADIUS = 1;
const ORBITAL_RADIUS = 2;
const VELOCITY_FACTOR = 15;
class SimpleTrajectorySystem {
  constructor(planetPosition) {
    this.planetPosition = planetPosition;
    this.a = 0;
    this.e = 0;
  }
  startTrajectory(position, velocity) {
    const r = position.distanceTo(this.planetPosition);
    velocity.length();
    this.a = (r + ORBITAL_RADIUS) / 2;
    this.e = (ORBITAL_RADIUS - r) / (ORBITAL_RADIUS + r);
  }
  updatePosition(elapsedTime) {
    const period = 2 * Math.PI * Math.sqrt(this.a * this.a * this.a / PLANET_RADIUS);
    const meanAnomaly = 2 * Math.PI * elapsedTime / period;
    const trueAnomaly = meanAnomaly;
    const distance = this.a * (1 - this.e * this.e) / (1 + this.e * Math.cos(trueAnomaly));
    const x = this.planetPosition.x + distance * Math.cos(trueAnomaly);
    const z = this.planetPosition.z + distance * Math.sin(trueAnomaly);
    const y = this.planetPosition.y;
    return new Vector3(x, y, z);
  }
}
const Scene = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $orbitPosition, $$unsubscribe_orbitPosition;
  let $time, $$unsubscribe_time;
  let $launchVelocity, $$unsubscribe_launchVelocity;
  let $launchDirection, $$unsubscribe_launchDirection;
  let $isPaused, $$unsubscribe_isPaused;
  let $isOrbiting, $$unsubscribe_isOrbiting;
  let $isLaunched, $$unsubscribe_isLaunched;
  let $launchTime, $$unsubscribe_launchTime;
  let $autoRotate, $$unsubscribe_autoRotate;
  $$unsubscribe_orbitPosition = subscribe(orbitPosition, (value) => $orbitPosition = value);
  $$unsubscribe_launchVelocity = subscribe(launchVelocity, (value) => $launchVelocity = value);
  $$unsubscribe_launchDirection = subscribe(launchDirection, (value) => $launchDirection = value);
  $$unsubscribe_isPaused = subscribe(isPaused, (value) => $isPaused = value);
  $$unsubscribe_isOrbiting = subscribe(isOrbiting, (value) => $isOrbiting = value);
  $$unsubscribe_isLaunched = subscribe(isLaunched, (value) => $isLaunched = value);
  $$unsubscribe_launchTime = subscribe(launchTime, (value) => $launchTime = value);
  $$unsubscribe_autoRotate = subscribe(autoRotate, (value) => $autoRotate = value);
  let time = writable(0);
  $$unsubscribe_time = subscribe(time, (value) => $time = value);
  let orbitTrail;
  const planetPosition = new Vector3(0, 1.2, -1.75);
  const modelInitialPosition = new Vector3(-7, 2.8, -9);
  const trajectorySystem = new SimpleTrajectorySystem(planetPosition);
  orbitPosition.set(modelInitialPosition);
  function updateSatellitePosition(t) {
    const speed = 0.5;
    return new Vector3(planetPosition.x + ORBITAL_RADIUS * Math.cos(t * speed), planetPosition.y, planetPosition.z + ORBITAL_RADIUS * Math.sin(t * speed));
  }
  let satellitePosition = updateSatellitePosition(0);
  useFrame((_, delta) => {
    if (!$isPaused) {
      time.update((t) => t + delta);
    }
    satellitePosition = updateSatellitePosition($time);
    if ($isLaunched && !$isPaused) {
      const elapsedTime = ($time - $launchTime) / 1e3;
      const newPosition = trajectorySystem.updatePosition(elapsedTime);
      orbitPosition.set(newPosition);
      if (orbitTrail && orbitTrail.addPoint) {
        orbitTrail.addPoint(newPosition.x, newPosition.y, newPosition.z);
      }
    }
  });
  function handleReset() {
    resetLaunch();
    resetOrbit();
    orbitPosition.set(modelInitialPosition);
    time.set(0);
    if (orbitTrail && orbitTrail.reset) {
      orbitTrail.reset();
    }
  }
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (!$isLaunched) {
        handleReset();
      }
    }
    {
      {
        if ($isLaunched && !$isOrbiting && !$isPaused) {
          const orbitSpeed = Math.sqrt(PLANET_RADIUS / ORBITAL_RADIUS) * VELOCITY_FACTOR;
          const launchVelocityVector = new Vector3($launchDirection.x * $launchVelocity * orbitSpeed, $launchDirection.y * $launchVelocity * orbitSpeed, $launchDirection.z * $launchVelocity * orbitSpeed);
          startOrbit($orbitPosition, launchVelocityVector, $time);
          trajectorySystem.startTrajectory($orbitPosition, launchVelocityVector);
        }
      }
    }
    $$rendered = `  ${validate_component(T.PerspectiveCamera, "T.PerspectiveCamera").$$render(
      $$result,
      {
        makeDefault: true,
        position: [-22, 10, -20],
        fov: 15
      },
      {},
      {
        default: () => {
          return `${validate_component(OrbitControls, "OrbitControls").$$render(
            $$result,
            {
              autoRotate: false,
              enableZoom: true,
              enableDamping: true,
              autoRotateSpeed: 0.5,
              "target.y": 1.5
            },
            {},
            {}
          )}`;
        }
      }
    )} ${validate_component(T.DirectionalLight, "T.DirectionalLight").$$render($$result, { intensity: 0.8, position: [5, 10, 0] }, {}, {})} ${validate_component(T.AmbientLight, "T.AmbientLight").$$render($$result, { intensity: 0.2 }, {}, {})} ${validate_component(Grid, "Grid").$$render(
      $$result,
      {
        "position.y": -0.01,
        cellColor: "#6b7280",
        sectionColor: "#6b7280",
        sectionThickness: 1,
        fadeDistance: 220,
        cellSize: 2,
        sectionSize: 10,
        infiniteGrid: true
      },
      {},
      {}
    )} ${validate_component(ContactShadows, "ContactShadows").$$render(
      $$result,
      {
        scale: 10,
        blur: 2,
        far: 2.5,
        opacity: 0.5
      },
      {},
      {}
    )}  ${validate_component(T.Mesh, "T.Mesh").$$render(
      $$result,
      {
        position: [planetPosition.x, planetPosition.y, planetPosition.z]
      },
      {},
      {
        default: () => {
          return `${validate_component(T.SphereGeometry, "T.SphereGeometry").$$render($$result, { args: [PLANET_RADIUS, 32, 32] }, {}, {})} ${validate_component(T.MeshStandardMaterial, "T.MeshStandardMaterial").$$render($$result, { color: "#0059BA" }, {}, {})}`;
        }
      }
    )}  ${validate_component(T.Mesh, "T.Mesh").$$render(
      $$result,
      {
        position: [satellitePosition.x, satellitePosition.y, satellitePosition.z]
      },
      {},
      {
        default: () => {
          return `${validate_component(T.SphereGeometry, "T.SphereGeometry").$$render($$result, { args: [0.3, 32, 32] }, {}, {})} ${validate_component(T.MeshStandardMaterial, "T.MeshStandardMaterial").$$render($$result, { color: "#F85122" }, {}, {})}`;
        }
      }
    )}  ${validate_component(ModelLoader, "ModelLoader").$$render(
      $$result,
      {
        position: [$orbitPosition.x, $orbitPosition.y, $orbitPosition.z],
        rotation: [0, $autoRotate ? $time : 0, 0],
        scale: 0.2
      },
      {},
      {
        default: () => {
          return `${validate_component(T.MeshStandardMaterial, "T.MeshStandardMaterial").$$render(
            $$result,
            {
              color: "#FFFFFF",
              opacity: $isLaunched ? 1 : 0.5,
              transparent: true
            },
            {},
            {}
          )}`;
        }
      }
    )} ${validate_component(OrbitTrail, "OrbitTrail").$$render(
      $$result,
      {
        maxPoints: 500,
        fadeOut: true,
        color: "#4169E1",
        this: orbitTrail
      },
      {
        this: ($$value) => {
          orbitTrail = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_orbitPosition();
  $$unsubscribe_time();
  $$unsubscribe_launchVelocity();
  $$unsubscribe_launchDirection();
  $$unsubscribe_isPaused();
  $$unsubscribe_isOrbiting();
  $$unsubscribe_isLaunched();
  $$unsubscribe_launchTime();
  $$unsubscribe_autoRotate();
  return $$rendered;
});
const ModelHUD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedModel, $$unsubscribe_selectedModel;
  let $autoRotate, $$unsubscribe_autoRotate;
  $$unsubscribe_selectedModel = subscribe(selectedModel, (value) => $selectedModel = value);
  $$unsubscribe_autoRotate = subscribe(autoRotate, (value) => $autoRotate = value);
  const models = ["Virus", "Cat", "Ribs"];
  $$unsubscribe_selectedModel();
  $$unsubscribe_autoRotate();
  return `  <div class="w-full p-4 border border-gray-700 rounded-xl"><label for="model-select" class="block text-sm font-medium text-gray-400 mb-2" data-svelte-h="svelte-j856m8">Select Model</label> <select id="model-select" class="bg-gray-700 text-white rounded-md p-2 w-full">${each(models, (model) => {
    return `<option${add_attribute("value", model, 0)} ${$selectedModel === model ? "selected" : ""}>${escape(model)} </option>`;
  })}</select> <div class="mt-4"><label class="flex items-center space-x-2"><input type="checkbox" class="form-checkbox text-blue-600"${add_attribute("checked", $autoRotate, 1)}> <span class="text-sm text-gray-400" data-svelte-h="svelte-1gvj9ew">Auto-rotate</span></label></div></div>`;
});
function formatTime(ms) {
  const minutes = Math.floor(ms / 6e4);
  const seconds = Math.floor(ms % 6e4 / 1e3);
  const milliseconds = ms % 1e3;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
}
const LaunchHUD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isPaused, $$unsubscribe_isPaused;
  let $isLaunched, $$unsubscribe_isLaunched;
  let $launchTime, $$unsubscribe_launchTime;
  $$unsubscribe_isPaused = subscribe(isPaused, (value) => $isPaused = value);
  $$unsubscribe_isLaunched = subscribe(isLaunched, (value) => $isLaunched = value);
  $$unsubscribe_launchTime = subscribe(launchTime, (value) => $launchTime = value);
  $$unsubscribe_isPaused();
  $$unsubscribe_isLaunched();
  $$unsubscribe_launchTime();
  return `  <div class="flex flex-col items-center p-4 bg-opacity-80 bg-gray-900 rounded-xl backdrop-blur-md"><div class="text-2xl font-light text-gray-300 font-mono mb-4">${escape(formatTime($launchTime))}</div> <div class="flex items-center gap-4"><button class="flex items-center justify-center gap-2 w-32 px-6 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">${$isLaunched && !$isPaused ? `${validate_component(Pause, "Pause").$$render($$result, { size: 20 }, {}, {})} <span class="font-semibold" data-svelte-h="svelte-eay3l2">Pause</span>` : `${validate_component(Play, "Play").$$render($$result, { size: 20 }, {}, {})} <span class="font-semibold">${escape($isLaunched ? "Resume" : "Launch")}</span>`}</button> <button class="flex items-center justify-center w-10 h-10 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">${validate_component(Rotate_ccw, "RotateCcw").$$render($$result, { size: 20 }, {}, {})}</button></div></div>`;
});
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = [0] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Slider$1, "SliderPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("relative flex w-full touch-none select-none items-center", className)
        },
        $$restProps,
        { value }
      ),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ thumbs }) => {
          return `<span class="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full">${validate_component(Slider_range, "SliderPrimitive.Range").$$render($$result, { class: "bg-primary absolute h-full" }, {}, {})}</span> ${each(thumbs, (thumb) => {
            return `${validate_component(Slider_thumb, "SliderPrimitive.Thumb").$$render(
              $$result,
              {
                thumb,
                class: "border-primary bg-background ring-offset-background focus-visible:ring-ring block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              },
              {},
              {}
            )}`;
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const FlightHUD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let speed;
  let altitude;
  let $orbitPosition, $$unsubscribe_orbitPosition;
  let $orbitVelocity, $$unsubscribe_orbitVelocity;
  let $isLaunched, $$unsubscribe_isLaunched;
  let $launchDirection, $$unsubscribe_launchDirection;
  let $launchVelocity, $$unsubscribe_launchVelocity;
  $$unsubscribe_orbitPosition = subscribe(orbitPosition, (value) => $orbitPosition = value);
  $$unsubscribe_orbitVelocity = subscribe(orbitVelocity, (value) => $orbitVelocity = value);
  $$unsubscribe_isLaunched = subscribe(isLaunched, (value) => $isLaunched = value);
  $$unsubscribe_launchDirection = subscribe(launchDirection, (value) => $launchDirection = value);
  $$unsubscribe_launchVelocity = subscribe(launchVelocity, (value) => $launchVelocity = value);
  let dirX = 0, dirY = 0, dirZ = 0;
  function updateDirection(axis, value) {
    launchDirection.update((dir) => ({ ...dir, [axis]: value }));
  }
  {
    {
      dirX = $launchDirection.x;
      dirY = $launchDirection.y;
      dirZ = $launchDirection.z;
    }
  }
  speed = $isLaunched ? $orbitVelocity.length().toFixed(2) : "0.00";
  altitude = Math.max(0, $orbitPosition.length() - PLANET_RADIUS).toFixed(2);
  $$unsubscribe_orbitPosition();
  $$unsubscribe_orbitVelocity();
  $$unsubscribe_isLaunched();
  $$unsubscribe_launchDirection();
  $$unsubscribe_launchVelocity();
  return `  <div class="w-full flex flex-col items-start justify-end p-4 border border-gray-700 rounded-xl space-y-4"><div class="w-full space-y-4"><div class="flex space-x-4"><div class="flex-1"><label for="dirX" class="text-gray-400 text-xs block mb-1">X: ${escape(dirX.toFixed(2))}</label> ${validate_component(Slider, "Slider").$$render(
    $$result,
    {
      id: "dirX",
      min: -1,
      max: 1,
      step: 0.01,
      value: [dirX],
      onValueChange: ([value]) => updateDirection("x", value),
      class: "h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white"
    },
    {},
    {}
  )}</div> <div class="flex-1"><label for="dirY" class="text-gray-400 text-xs block mb-1">Y: ${escape(dirY.toFixed(2))}</label> ${validate_component(Slider, "Slider").$$render(
    $$result,
    {
      id: "dirY",
      min: -1,
      max: 1,
      step: 0.01,
      value: [dirY],
      onValueChange: ([value]) => updateDirection("y", value),
      class: "h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white"
    },
    {},
    {}
  )}</div> <div class="flex-1"><label for="dirZ" class="text-gray-400 text-xs block mb-1">Z: ${escape(dirZ.toFixed(2))}</label> ${validate_component(Slider, "Slider").$$render(
    $$result,
    {
      id: "dirZ",
      min: -1,
      max: 1,
      step: 0.01,
      value: [dirZ],
      onValueChange: ([value]) => updateDirection("z", value),
      class: "h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white"
    },
    {},
    {}
  )}</div></div></div> <div class="w-full mb-4"><label for="velocity" class="text-gray-400 text-xs block mb-1">Velocity: ${escape($launchVelocity.toFixed(2))} km/s</label> ${validate_component(Slider, "Slider").$$render(
    $$result,
    {
      id: "velocity",
      min: 0,
      max: 20,
      step: 0.1,
      value: [$launchVelocity],
      onValueChange: ([value]) => launchVelocity.set(value),
      class: "h-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_.bg-primary]:bg-white"
    },
    {},
    {}
  )}</div> <div class="w-full space-y-2"><div class="flex justify-between"><span class="text-gray-400" data-svelte-h="svelte-148ple2">Speed:</span> <span>${escape(speed)} km/s</span></div> <div class="flex justify-between"><span class="text-gray-400" data-svelte-h="svelte-1ht2imh">Altitude:</span> <span>${escape(altitude)} km</span></div></div></div>`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  <div class="relative w-screen h-screen overflow-hidden text-white bg-gradient-to-b from-[#0d1320] to-[#080c15]">${validate_component(Canvas, "Canvas").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Scene, "Scene").$$render($$result, {}, {}, {})}`;
    }
  })} <div class="absolute bottom-0 left-0 right-0 p-4 md:p-8"> <div class="hidden md:flex justify-between items-end"><div class="w-1/4">${validate_component(ModelHUD, "ModelHUD").$$render($$result, {}, {}, {})}</div> <div class="flex-grow flex justify-center">${validate_component(LaunchHUD, "LaunchHUD").$$render($$result, {}, {}, {})}</div> <div class="w-1/4">${validate_component(FlightHUD, "FlightHUD").$$render($$result, {}, {}, {})}</div></div>  <div class="flex flex-col md:hidden"><div class="mb-4 flex justify-center">${validate_component(LaunchHUD, "LaunchHUD").$$render($$result, {}, {}, {})}</div> <div class="flex"><div class="w-1/3 pr-2">${validate_component(ModelHUD, "ModelHUD").$$render($$result, {}, {}, {})}</div> <div class="w-2/3 pl-2">${validate_component(FlightHUD, "FlightHUD").$$render($$result, {}, {}, {})}</div></div></div></div></div>`;
});
const css = {
  code: "body{margin:0;overflow:hidden}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<!-- routes/+page.svelte -->\\n\\n<svelte:head>\\n\\t<title>jzro | Aerospace UX & Software</title>\\n\\t<meta name=\\"description\\" content=\\"Human-centered design & code for the space race. Websites, apps, avionics and hard-tech engineering for aero+space startups and enterprises.\\" />\\n</svelte:head>\\n\\n<script lang=\\"ts\\">import Nav from \\"$lib/components/Nav.svelte\\";\\nimport App from \\"$lib/app/App.svelte\\";\\nimport { isLaunched } from \\"$lib/stores/launchStore\\";\\nimport { fade } from \\"svelte/transition\\";\\n<\/script>\\n\\n<div class=\\"relative w-screen h-screen\\">\\n  <App />\\n\\n  <Nav />\\n  \\n  {#if !$isLaunched}\\n    <div class=\\"absolute top-24 left-4 sm:left-16 right-10 text-white\\" transition:fade>\\n      <h1 class=\\"text-4xl md:text-5xl lg:text-5xl uppercase font-thin mb-2 opacity-80\\">Aerospace UX</h1>\\n      <p class=\\"font-thin text-xl md:text-2xl lg:text-2xl opacity-60\\">Code & design make</p>\\n      <p class=\\"font-thin text-xl md:text-2xl lg:text-2xl opacity-60\\">products fly</p>\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  :global(body) {\\n    margin: 0;\\n    overflow: hidden;\\n  }\\n</style>"],"names":[],"mappings":"AA4BU,IAAM,CACZ,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,MACZ"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLaunched, $$unsubscribe_isLaunched;
  $$unsubscribe_isLaunched = subscribe(isLaunched, (value) => $isLaunched = value);
  $$result.css.add(css);
  $$unsubscribe_isLaunched();
  return ` ${$$result.head += `<!-- HEAD_svelte-tmea3l_START -->${$$result.title = `<title>jzro | Aerospace UX &amp; Software</title>`, ""}<meta name="description" content="Human-centered design & code for the space race. Websites, apps, avionics and hard-tech engineering for aero+space startups and enterprises."><!-- HEAD_svelte-tmea3l_END -->`, ""}  <div class="relative w-screen h-screen">${validate_component(App, "App").$$render($$result, {}, {}, {})} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${!$isLaunched ? `<div class="absolute top-24 left-4 sm:left-16 right-10 text-white" data-svelte-h="svelte-1mzgwpo"><h1 class="text-4xl md:text-5xl lg:text-5xl uppercase font-thin mb-2 opacity-80">Aerospace UX</h1> <p class="font-thin text-xl md:text-2xl lg:text-2xl opacity-60">Code &amp; design make</p> <p class="font-thin text-xl md:text-2xl lg:text-2xl opacity-60">products fly</p></div>` : ``} </div>`;
});
export {
  Page as default
};
