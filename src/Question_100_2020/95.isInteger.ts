function isInteger(source: unknown) {
  return (
    typeof source === 'number' && Number.isFinite(source) && source % 1 === 0
  );
}

export default {
  run: () => {
    const int1 = 1.0;
    const int2 = -10;
    const int3 = 0;
    const int4 = -11;
    const float1 = 1.1;
    const float2 = 0.1;
    const float3 = -0.1;
    const float4 = -10.1;

    console.log(
      'we are integer: ',
      isInteger(int1),
      isInteger(int2),
      isInteger(int3),
      isInteger(int4)
    );
    console.log(
      'we are float, can we became integer?: ',
      isInteger(float1),
      isInteger(float2),
      isInteger(float3),
      isInteger(float4)
    );
  },
};
