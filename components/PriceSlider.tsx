// components/PriceSlider.tsx
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const PriceSlider = () => {
  const [values, setValues] = useState([50]);
  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;

  return (
    <div>
      <output style={{ marginTop: "10px" }} className="mb-2">
        Price: AE${values[0]}
      </output>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "10px",
              width: "100%",
              background: getTrackBackground({
                values,
                colors: ["#548BF4", "#ccc"],
                min: MIN,
                max: MAX,
              }),
            }}
            className="mt-4"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#FFF",
              border: "1px solid #CCC",
              borderRadius: "50%",
            }}
          />
        )}
      />
    </div>
  );
};

export default PriceSlider;
