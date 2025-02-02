#version 450

out vec4 FragColor;
  
in vec2 TexCoords;

uniform sampler2D screenTexture;

const float offset = 1.0 / 300.0;

void main()
{ 
    vec2 offsets[9] = vec2[](
        vec2(-offset,  offset), // Top left
        vec2( 0.0f,    offset), // Top center
        vec2( offset,  offset), // Top right
        vec2(-offset,  0.0f),   // Center left
        vec2( 0.0f,    0.0f),   // Center
        vec2( offset,  0.0f),   // Center right
        vec2(-offset, -offset), // Bottom left
        vec2( 0.0f,   -offset), // Bottom center
        vec2( offset, -offset)  // Bottom right    
    );

//    float kernel[9] = float[](
//        1,  1, 1,
//        1, -8, 1,
//        1,  1, 1
//    );

    float kernel[9] = float[](
        2,   2, 2,
        2, -15, 2,
        2,   2, 2
    );

    vec3 sampleTex[9];
    for(int i = 0; i < 9; i++)
    {
        sampleTex[i] = vec3(texture(screenTexture, TexCoords.st + offsets[i]));
    }

    vec3 col = vec3(0.0);
    for(int i = 0; i < 9; i++)
    {
        col += sampleTex[i] * kernel[i];
    }

    FragColor = vec4(col, 1.0);
    FragColor = vec4(vec3(1.0 - texture(screenTexture, TexCoords)), 1.0);
}