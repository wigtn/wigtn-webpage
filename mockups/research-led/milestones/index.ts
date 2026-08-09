/**
 * Cover art for the four milestone entries whose posts now live on the tech
 * report site.
 *
 * The posts moved; the rail did not. Each of these was the cover of a story
 * under /news, colocated with its prose, and deleting the folders would have
 * taken the homepage rail's pictures with them. They are copies rather than
 * cross-repo imports because the two sites build independently: a path into
 * ../wigtn-tech-report resolves on this machine and nowhere else.
 *
 * Nothing but MILESTONES reads these. If a rail entry loses its photo, delete
 * the file with it.
 */

import aclTeam from "./acl-2026-team.jpg";
import snowflakeWinners from "./snowflake-2026-winners.jpg";
import traeCertificate from "./trae-seoul-certificate.jpg";
import obaTitle from "./oba-weekendthon-title.jpg";

export const ACL_2026_COVER = aclTeam.src;
export const SNOWFLAKE_2026_COVER = snowflakeWinners.src;
export const TRAE_SEOUL_COVER = traeCertificate.src;
export const OBA_WEEKENDTHON_COVER = obaTitle.src;
