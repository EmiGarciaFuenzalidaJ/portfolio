/**
 * Shared layout rhythm for the landing sections.
 *
 * These were duplicated as literal class strings in every section file and had
 * drifted: Projects sat 4px further left than its neighbours on mobile,
 * Experience was 128px narrower than everything else, and two sections used a
 * shorter vertical rhythm than the other three. The edges of the content now
 * line up because there is one definition instead of six.
 *
 * Change the rhythm here, not in the sections.
 */

/** Section shell: scroll offset for the fixed navbar, side gutters, vertical rhythm. */
export const SECTION = 'scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32';

/**
 * Same as SECTION but without the vertical padding, for sections that need a
 * full-bleed element (Contact's marquee) and manage their own spacing.
 */
export const SECTION_X = 'scroll-mt-24 px-5 sm:px-8 md:px-10';

/** Content column. Every section shares this width so the left edges align. */
export const CONTAINER = 'mx-auto max-w-6xl';
