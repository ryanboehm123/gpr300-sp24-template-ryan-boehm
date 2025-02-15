#version 450

// Vertex attributes
layout(location = 0) in vec3 vPos; // Vertex position in model space
layout(location = 1) in vec3 vNormal; // Vertex position in model space
layout(location = 2) in vec2 vTexCoord; // Vertex texture coordinate (UV)

out VS_OUT {
	vec3 FragPos;
	vec3 Normal;
	vec2 TexCoords;
	vec4 FragPosLightSpace;
} vs_out;

uniform mat4 _Model; // Model->World Matrix
uniform mat4 _ViewProjection; // Combined View->Projection Matrix
uniform mat4 lightSpaceMatrix;

void main() {
	// Transform vertex position to World Space
	vs_out.FragPos = vec3(_Model * vec4(vPos, 1.0));
	// Transform vertex normal to world space using Normal Matrix
	vs_out.Normal = transpose(inverse(mat3(_Model))) * vNormal;
	vs_out.TexCoords = vTexCoord;
	vs_out.FragPosLightSpace = lightSpaceMatrix * vec4(vs_out.FragPos, 1.0);
	gl_Position = _ViewProjection * vec4(vs_out.FragPos, 1.0);
}