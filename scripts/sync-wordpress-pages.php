<?php
/**
 * Synchronize the public Bytesavy site map into WordPress Pages.
 * Run inside WordPress: php /tmp/sync-wordpress-pages.php
 */

$wpLoad = getenv('WP_LOAD_PATH') ?: '/var/www/html/wp-load.php';
if (!file_exists($wpLoad)) {
    fwrite(STDERR, "WordPress could not be found at {$wpLoad}\n");
    exit(1);
}
require_once $wpLoad;

function page_content(string $intro, array $sections = []): string {
    $html = '<!-- wp:paragraph {"className":"page-introduction"} --><p class="page-introduction">' . esc_html($intro) . '</p><!-- /wp:paragraph -->';
    foreach ($sections as $heading => $body) {
        $html .= '<!-- wp:heading --><h2 class="wp-block-heading">' . esc_html($heading) . '</h2><!-- /wp:heading -->';
        $html .= '<!-- wp:paragraph --><p>' . esc_html($body) . '</p><!-- /wp:paragraph -->';
    }
    return $html;
}

$pages = [
    ['path' => 'home', 'title' => 'Home', 'intro' => 'Bytesavy designs and builds exceptional software that moves business forward.', 'sections' => [
        'Software for complex industries' => 'We transform critical workflows in agriculture, energy, resources, construction, and manufacturing into seamless digital products.',
        'Strategy, design, and engineering' => 'One senior team takes products from discovery and experience design through engineering, launch, and continuous improvement.',
        'Selected work' => 'Explore web platforms, mobile applications, cloud software, research databases, and intelligent automation built for demanding real-world operations.'
    ]],
    ['path' => 'about', 'title' => 'About Bytesavy', 'intro' => 'We turn complex operational challenges into practical software that people value.', 'sections' => [
        'Our mission' => 'Bytesavy designs and delivers custom software that modernizes operations for agribusiness and industrial organizations.',
        'Our vision' => 'To be the trusted technology partner transforming traditional industries through practical, modern software that drives efficiency, profitability, and resilience.',
        'How we work' => 'We listen first, collaborate directly, and combine exceptional design with reliable engineering.'
    ]],
    ['path' => 'academy', 'title' => 'Bytesavy Academy', 'intro' => 'Master practical AI skills through focused courses, workshops, and live sessions.', 'sections' => [
        'Practical AI learning' => 'Understand AI fundamentals, prompting, modern tools, responsible adoption, and real-world business applications.',
        'Built for working teams' => 'Programs are designed to help leaders and teams apply useful skills immediately.'
    ]],
    ['path' => 'ai', 'title' => 'AI Integration and Automation', 'intro' => 'Practical AI solutions that automate repetitive work, improve decisions, and connect operational knowledge.', 'sections' => [
        'AI capabilities' => 'Natural language systems, predictive analytics, intelligent automation, machine learning, computer vision, and data analytics.',
        'Responsible implementation' => 'We identify valuable use cases, validate them quickly, and integrate AI safely into existing workflows.'
    ]],
    ['path' => 'blog', 'title' => 'Insights', 'intro' => 'Practical thinking on software product design, engineering, AI, and digital transformation.', 'sections' => [
        'From the Bytesavy team' => 'Ideas for leaders building and modernizing technology in complex industries.'
    ]],
    ['path' => 'consulting', 'title' => 'Strategic Technology Consulting', 'intro' => 'Expert guidance for organizations modernizing operations, selecting technology, and planning long-term investments.', 'sections' => [
        'Consulting roadmap' => 'Our process moves from discovery and strategy through solution design and implementation support.',
        'Clear decisions' => 'We turn technical complexity into a focused roadmap aligned with operational priorities and measurable outcomes.'
    ]],
    ['path' => 'contact', 'title' => 'Contact Bytesavy', 'intro' => 'Tell us what you are building, improving, or trying to make possible.', 'sections' => [
        'Start a conversation' => 'Contact our team to discuss product strategy, software design, engineering, AI, modernization, or ongoing support.',
        'Email' => 'hello@bytesavy.com'
    ]],
    ['path' => 'development', 'title' => 'Custom Software Development', 'intro' => 'Reliable software engineered around your operation, users, and long-term business goals.', 'sections' => [
        'Full-cycle delivery' => 'Discovery, architecture, product design, iterative development, quality assurance, deployment, and ongoing support.',
        'Technical depth' => 'Modern web, mobile, backend, cloud, data, integration, security, and DevOps capabilities.'
    ]],
    ['path' => 'mobile', 'title' => 'Mobile App Development', 'intro' => 'Reliable mobile products for teams and customers working in the field, on the floor, and on the move.', 'sections' => [
        'Every platform' => 'Native iOS, native Android, and cross-platform applications connected to secure cloud services.',
        'Ready for real conditions' => 'Offline workflows, synchronization, notifications, security, analytics, and app store delivery.'
    ]],
    ['path' => 'web', 'title' => 'Web Development Services', 'intro' => 'High-performance websites and web applications built for complex organizations.', 'sections' => [
        'Web platforms' => 'Customer portals, business applications, data platforms, ecommerce, corporate websites, and content management systems.',
        'Designed to perform' => 'Responsive experience design, secure architecture, integrations, analytics, accessibility, and performance optimization.'
    ]],
    ['path' => 'product', 'title' => 'Services', 'intro' => 'Integrated product strategy, design, software engineering, AI, consulting, and support.', 'sections' => [
        'Digital products' => 'Web applications, mobile products, cloud systems, AI solutions, and connected operational platforms.',
        'Long-term partnership' => 'From the first strategic decision through launch, support, and continuous improvement.'
    ]],
    ['path' => 'solutions', 'title' => 'Software Solutions', 'intro' => 'Purpose-built technology for organizations with specialized workflows and ambitious goals.', 'sections' => [
        'Custom solutions' => 'Enterprise software, mobile products, UI and UX design, AI integration, analytics, cloud infrastructure, and security.',
        'Built around your business' => 'We shape the architecture and experience around the people, processes, and systems that make your organization unique.'
    ]],
    ['path' => 'support', 'title' => 'Software Support and Maintenance', 'intro' => 'Responsive technical support that keeps critical digital products secure, reliable, and improving.', 'sections' => [
        'Ongoing reliability' => 'Monitoring, incident response, maintenance, performance optimization, security updates, and product enhancements.',
        'A team that knows your system' => 'Direct access to experienced engineers who understand the product and the operation behind it.'
    ]],
    ['path' => 'privacy', 'title' => 'Privacy Policy and Terms', 'intro' => 'How Bytesavy collects, uses, protects, and manages information.', 'sections' => [
        'Information and privacy' => 'We collect only the information needed to provide services, respond to inquiries, improve our website, and meet legal obligations.',
        'Your rights' => 'You may request access, correction, or deletion of your personal information and opt out of marketing communications.',
        'Terms of service' => 'Use of Bytesavy websites and services is subject to applicable agreements, laws, and acceptable-use requirements.'
    ]],
    ['path' => 'site-pages', 'title' => 'Site Pages', 'intro' => 'Explore Bytesavy services, solutions, company information, insights, and legal pages.'],
    ['path' => 'locations', 'title' => 'Locations', 'intro' => 'Software design and engineering for organizations across the Canadian Prairies and beyond.'],
    ['path' => 'locations/alberta', 'title' => 'Software Development in Alberta', 'intro' => 'Custom software, mobile applications, AI, and modernization for organizations across Calgary, Edmonton, and rural Alberta.', 'sections' => [
        'Industry expertise' => 'Purpose-built technology for agriculture, energy, oil and gas, construction, resources, and essential services.',
        'Alberta capabilities' => 'Web applications, field tools, data systems, cloud platforms, integrations, and legacy modernization.'
    ]],
    ['path' => 'locations/manitoba', 'title' => 'Software Development in Manitoba', 'intro' => 'Custom software and digital product development for organizations across Winnipeg, Brandon, and rural Manitoba.', 'sections' => [
        'Local industry understanding' => 'Technology for agriculture, manufacturing, construction, services, and growing Manitoba organizations.',
        'End-to-end delivery' => 'Strategy, design, web and mobile engineering, AI, cloud systems, and ongoing support.'
    ]],
    ['path' => 'locations/saskatchewan', 'title' => 'Software Development in Saskatchewan', 'intro' => 'Custom software and mobile products for organizations across Saskatoon, Regina, and rural Saskatchewan.', 'sections' => [
        'Built for Saskatchewan industry' => 'Digital products for agriculture, mining, resources, construction, and industrial operations.',
        'Practical modernization' => 'Modern interfaces, reliable data systems, field applications, automation, and secure cloud platforms.'
    ]],
    ['path' => 'canmade', 'title' => 'CanMade', 'intro' => 'Discover Canadian products by scanning barcodes and instantly checking where products are made.', 'sections' => [
        'Support Canadian businesses' => 'CanMade makes it easy for shoppers to identify Canadian products and make informed purchasing decisions.',
        'Available on iOS' => 'Scan products, explore local alternatives, and contribute to a growing Canadian product database.'
    ]],
    ['path' => 'canmade/privacy', 'title' => 'CanMade Privacy Policy', 'intro' => 'How the CanMade application handles and protects user information.'],
    ['path' => 'canmade/quiz', 'title' => 'CanMade Canadian Quiz', 'intro' => 'Test your knowledge of Canadian products, companies, and brands.'],
    ['path' => 'card', 'title' => 'Hashim Farooq Digital Card', 'intro' => 'Founder of Bytesavy and builder of practical digital products.', 'sections' => [
        'Connect' => 'Contact Hashim and explore products including FlashIQ, SnapTrack, and SwiftRide.'
    ]],
];

$ids = [];
$created = 0;
$updated = 0;

foreach ($pages as $page) {
    $parts = explode('/', $page['path']);
    $slug = array_pop($parts);
    $parentPath = implode('/', $parts);
    $parentId = $parentPath !== '' ? ($ids[$parentPath] ?? 0) : 0;
    $existing = get_page_by_path($page['path'], OBJECT, 'page');
    $record = [
        'post_type' => 'page',
        'post_status' => 'publish',
        'post_title' => $page['title'],
        'post_name' => $slug,
        'post_parent' => $parentId,
        'post_content' => page_content($page['intro'], $page['sections'] ?? []),
        'post_excerpt' => $page['intro'],
        'menu_order' => count($ids),
    ];

    if ($existing) {
        $record['ID'] = $existing->ID;
        $id = wp_update_post(wp_slash($record), true);
        $updated++;
    } else {
        $id = wp_insert_post(wp_slash($record), true);
        $created++;
    }

    if (is_wp_error($id)) {
        fwrite(STDERR, "Failed {$page['path']}: {$id->get_error_message()}\n");
        continue;
    }
    $ids[$page['path']] = (int) $id;
    update_post_meta($id, '_bytesavy_frontend_path', '/' . ($page['path'] === 'home' ? '' : $page['path']));
    echo "Synced /{$page['path']} (ID {$id})\n";
}

if (isset($ids['home'])) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $ids['home']);
}
if (isset($ids['blog'])) {
    update_option('page_for_posts', $ids['blog']);
}
flush_rewrite_rules();

echo "Complete: {$created} created, {$updated} updated, " . count($ids) . " total.\n";
