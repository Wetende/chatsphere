#!/usr/bin/env python
"""
Script to generate Vue.js components from Chatbase.co analysis.
This script reads the Firecrawl analysis data and generates starter Vue.js components
based on the Chatbase UI patterns.
"""
import os
import json
import argparse
from datetime import datetime

# Directories
INPUT_DIR = "chatbase_firecrawl_data"
OUTPUT_DIR = "frontend/src/components"
VIEWS_DIR = "frontend/src/views"

def load_analysis_data(summary_file=None):
    """
    Load the analysis data from the specified summary file or find the most recent one.
    """
    if not os.path.exists(INPUT_DIR):
        print(f"Error: Input directory {INPUT_DIR} does not exist.")
        return None
    
    # If no summary file specified, find the most recent one
    if not summary_file:
        summary_files = [f for f in os.listdir(INPUT_DIR) if f.startswith("summary_")]
        if not summary_files:
            print("Error: No summary files found in the input directory.")
            return None
        
        summary_files.sort(reverse=True)
        summary_file = summary_files[0]
    
    # Load the summary file
    summary_path = os.path.join(INPUT_DIR, summary_file)
    try:
        with open(summary_path, 'r') as f:
            summary_data = json.load(f)
        print(f"Loaded summary data from {summary_path}")
        
        # Load all referenced files
        analysis_data = {
            "summary": summary_data
        }
        
        for filename in summary_data.get("generated_files", []):
            if not os.path.exists(filename):
                # Try with just the basename
                filename = os.path.basename(filename)
                if not os.path.exists(os.path.join(INPUT_DIR, filename)):
                    print(f"Warning: Referenced file {filename} not found.")
                    continue
                filename = os.path.join(INPUT_DIR, filename)
            
            try:
                with open(filename, 'r') as f:
                    file_data = json.load(f)
                
                # Use the filename (without path and extension) as the key
                key = os.path.splitext(os.path.basename(filename))[0]
                analysis_data[key] = file_data
                print(f"Loaded data from {filename}")
            except Exception as e:
                print(f"Error loading file {filename}: {e}")
        
        return analysis_data
    
    except Exception as e:
        print(f"Error loading summary file {summary_path}: {e}")
        return None

def generate_component_template(component_name, description, props=None, events=None):
    """
    Generate a Vue.js component template.
    """
    # Convert component name to PascalCase for the component definition
    pascal_case_name = ''.join(word.capitalize() for word in component_name.split('-'))
    
    # Create props section
    props_section = ""
    if props:
        props_items = []
        for prop in props:
            prop_type = prop.get('type', 'String')
            required = prop.get('required', False)
            default_value = prop.get('default', None)
            
            if default_value is not None:
                if prop_type == 'String':
                    default_str = f"default: '{default_value}'"
                elif prop_type == 'Boolean':
                    default_str = f"default: {str(default_value).lower()}"
                else:
                    default_str = f"default: {default_value}"
                props_items.append(f"    {prop['name']}: {{\n      type: {prop_type},\n      required: {str(required).lower()},\n      {default_str}\n    }}")
            else:
                props_items.append(f"    {prop['name']}: {{\n      type: {prop_type},\n      required: {str(required).lower()}\n    }}")
        
        if props_items:
            props_section = "  props: {\n" + ",\n".join(props_items) + "\n  },"
    
    # Create template
    template = f"""<template>
  <div class="{component_name}">
    <!-- {description} -->
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {{
  name: '{pascal_case_name}',
{props_section}
  data() {{
    return {{
      title: '{description}'
    }};
  }},
  methods: {{
    // Component methods
  }}
}};
</script>

<style scoped>
.{component_name} {{
  /* Component styles */
  margin-bottom: 20px;
}}
</style>
"""
    return template

def generate_landing_page_components():
    """
    Generate components for the landing page based on Chatbase analysis.
    """
    components = [
        {
            "name": "hero-section",
            "description": "Hero section with headline and call-to-action",
            "props": [
                {"name": "headline", "type": "String", "required": True},
                {"name": "subheadline", "type": "String", "required": False},
                {"name": "ctaText", "type": "String", "required": False, "default": "Build your agent"},
                {"name": "imageUrl", "type": "String", "required": False}
            ]
        },
        {
            "name": "feature-card",
            "description": "Feature card with icon, title and description",
            "props": [
                {"name": "title", "type": "String", "required": True},
                {"name": "description", "type": "String", "required": True},
                {"name": "icon", "type": "String", "required": False},
                {"name": "iconColor", "type": "String", "required": False, "default": "#42b983"}
            ]
        },
        {
            "name": "features-grid",
            "description": "Grid of feature cards",
            "props": [
                {"name": "title", "type": "String", "required": False, "default": "Features"},
                {"name": "columns", "type": "Number", "required": False, "default": 3}
            ]
        },
        {
            "name": "step-guide",
            "description": "Step-by-step guide with numbers and descriptions",
            "props": [
                {"name": "steps", "type": "Array", "required": True},
                {"name": "title", "type": "String", "required": False, "default": "How it works"}
            ]
        },
        {
            "name": "testimonial-card",
            "description": "Testimonial card with quote, author and company",
            "props": [
                {"name": "quote", "type": "String", "required": True},
                {"name": "author", "type": "String", "required": True},
                {"name": "company", "type": "String", "required": False},
                {"name": "avatarUrl", "type": "String", "required": False}
            ]
        },
        {
            "name": "testimonials-carousel",
            "description": "Carousel of testimonial cards",
            "props": [
                {"name": "testimonials", "type": "Array", "required": True},
                {"name": "autoplay", "type": "Boolean", "required": False, "default": True}
            ]
        },
        {
            "name": "integration-grid",
            "description": "Grid of integration logos",
            "props": [
                {"name": "integrations", "type": "Array", "required": True},
                {"name": "title", "type": "String", "required": False, "default": "Works with your tools"}
            ]
        },
        {
            "name": "cta-section",
            "description": "Call-to-action section with headline and button",
            "props": [
                {"name": "headline", "type": "String", "required": True},
                {"name": "buttonText", "type": "String", "required": False, "default": "Build your agent"},
                {"name": "buttonLink", "type": "String", "required": False, "default": "/signup"}
            ]
        }
    ]
    
    return components

def generate_dashboard_components():
    """
    Generate components for the dashboard based on Chatbase analysis.
    """
    components = [
        {
            "name": "sidebar-nav",
            "description": "Sidebar navigation for the dashboard",
            "props": [
                {"name": "items", "type": "Array", "required": True},
                {"name": "collapsed", "type": "Boolean", "required": False, "default": False}
            ]
        },
        {
            "name": "bot-card",
            "description": "Card displaying a bot with stats and actions",
            "props": [
                {"name": "bot", "type": "Object", "required": True},
                {"name": "showActions", "type": "Boolean", "required": False, "default": True}
            ]
        },
        {
            "name": "bot-list",
            "description": "List of bot cards",
            "props": [
                {"name": "bots", "type": "Array", "required": True},
                {"name": "loading", "type": "Boolean", "required": False, "default": False}
            ]
        },
        {
            "name": "analytics-chart",
            "description": "Analytics chart for bot usage",
            "props": [
                {"name": "data", "type": "Object", "required": True},
                {"name": "type", "type": "String", "required": False, "default": "line"},
                {"name": "title", "type": "String", "required": False}
            ]
        },
        {
            "name": "document-uploader",
            "description": "Component for uploading documents to train a bot",
            "props": [
                {"name": "botId", "type": "String", "required": True},
                {"name": "acceptedFormats", "type": "Array", "required": False, "default": ["pdf", "docx", "txt"]}
            ]
        },
        {
            "name": "model-settings",
            "description": "Settings panel for configuring AI model parameters",
            "props": [
                {"name": "modelType", "type": "String", "required": True},
                {"name": "parameters", "type": "Object", "required": True}
            ]
        }
    ]
    
    return components

def generate_chat_components():
    """
    Generate components for the chat interface based on Chatbase analysis.
    """
    components = [
        {
            "name": "chat-window",
            "description": "Main chat window component",
            "props": [
                {"name": "botId", "type": "String", "required": True},
                {"name": "conversationId", "type": "String", "required": False},
                {"name": "initialMessages", "type": "Array", "required": False, "default": []}
            ]
        },
        {
            "name": "message-bubble",
            "description": "Message bubble in chat",
            "props": [
                {"name": "message", "type": "Object", "required": True},
                {"name": "isBot", "type": "Boolean", "required": False, "default": False}
            ]
        },
        {
            "name": "chat-input",
            "description": "Input field for chat messages",
            "props": [
                {"name": "placeholder", "type": "String", "required": False, "default": "Type your message..."},
                {"name": "disabled", "type": "Boolean", "required": False, "default": False}
            ]
        },
        {
            "name": "typing-indicator",
            "description": "Indicator that the bot is typing",
            "props": [
                {"name": "visible", "type": "Boolean", "required": False, "default": False}
            ]
        },
        {
            "name": "feedback-buttons",
            "description": "Thumbs up/down feedback buttons for bot responses",
            "props": [
                {"name": "messageId", "type": "String", "required": True}
            ]
        }
    ]
    
    return components

def create_component_file(component, output_dir):
    """
    Create a Vue.js component file.
    """
    os.makedirs(output_dir, exist_ok=True)
    
    filename = f"{component['name']}.vue"
    filepath = os.path.join(output_dir, filename)
    
    template = generate_component_template(
        component['name'],
        component['description'],
        component.get('props'),
        component.get('events')
    )
    
    with open(filepath, 'w') as f:
        f.write(template)
    
    print(f"Created component file: {filepath}")
    return filepath

def generate_vue_components(analysis_data=None):
    """
    Generate Vue.js components based on the analysis data.
    """
    # Create component directories
    landing_dir = os.path.join(OUTPUT_DIR, "landing")
    dashboard_dir = os.path.join(OUTPUT_DIR, "dashboard")
    chat_dir = os.path.join(OUTPUT_DIR, "chat")
    
    os.makedirs(landing_dir, exist_ok=True)
    os.makedirs(dashboard_dir, exist_ok=True)
    os.makedirs(chat_dir, exist_ok=True)
    os.makedirs(VIEWS_DIR, exist_ok=True)
    
    # Generate components for each section
    generated_files = []
    
    # Landing page components
    landing_components = generate_landing_page_components()
    for component in landing_components:
        filepath = create_component_file(component, landing_dir)
        generated_files.append(filepath)
    
    # Dashboard components
    dashboard_components = generate_dashboard_components()
    for component in dashboard_components:
        filepath = create_component_file(component, dashboard_dir)
        generated_files.append(filepath)
    
    # Chat components
    chat_components = generate_chat_components()
    for component in chat_components:
        filepath = create_component_file(component, chat_dir)
        generated_files.append(filepath)
    
    # Generate main view files
    views = [
        {
            "name": "LandingView",
            "description": "Landing page showcasing the ChatSphere platform",
            "components": [comp["name"] for comp in landing_components]
        },
        {
            "name": "DashboardView",
            "description": "User dashboard for managing bots",
            "components": [comp["name"] for comp in dashboard_components]
        },
        {
            "name": "ChatView",
            "description": "Chat interface for interacting with bots",
            "components": [comp["name"] for comp in chat_components]
        },
        {
            "name": "BuilderView",
            "description": "Bot builder interface",
            "components": []
        }
    ]
    
    # Create summary of generated files
    summary = {
        "generation_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "generated_files": generated_files,
        "component_count": len(generated_files),
        "view_count": len(views),
        "next_steps": [
            "Customize component templates with actual HTML structure",
            "Add proper styling based on Chatbase design",
            "Implement component functionality",
            "Connect components to the API endpoints"
        ]
    }
    
    # Save summary
    summary_path = os.path.join("frontend", "components_summary.json")
    os.makedirs(os.path.dirname(summary_path), exist_ok=True)
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"\nComponent generation complete!")
    print(f"Generated {len(generated_files)} component files")
    print(f"Summary saved to {summary_path}")

def main():
    """
    Main function to execute the component generation process.
    """
    parser = argparse.ArgumentParser(description="Generate Vue.js components from Chatbase analysis")
    parser.add_argument('--summary', help='Path to the summary file (optional)')
    
    args = parser.parse_args()
    
    # Load analysis data
    analysis_data = load_analysis_data(args.summary) if args.summary else None
    
    # Generate Vue.js components
    generate_vue_components(analysis_data)

if __name__ == "__main__":
    main() 