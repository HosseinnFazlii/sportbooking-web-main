import { GridSortModel, GridFilterModel } from "@mui/x-data-grid-premium";
import { IActivityRecord, IBooking, IBookingLine, IBookingStatus, ICourse, ICourseImage, ICourseSession, IDashboardData, IFacility, IFacilityStaff, ILog, ILogType, IMenu, IMenuNode, IPermission, IPlace, IPlaceWorkingHour, IRole, IRoleUserSummary, ISport, ITeacherCity, ITeacherSport, ITeacherSummary, ITeacherWorkingHour, ITournament, ITournamentImage, ITournamentStanding, IUser, IVBooking, IVCourse, IVFacility, IVLog, IVTournament, IVUser } from "../types";
import { createBooking, createCourse, createDashboardData, createDataHook, createDataHookArray, createDataHookById, createFacility, createLog, createMenu, createRole, createSingleDataHook, createTournament, createUser, IMetaItem } from "../utils";

export const useDashboardData = createSingleDataHook<IDashboardData>('dashboard', createDashboardData());
export const useDashboardActivities = createDataHookArray<IActivityRecord>('dashboard/activities');

export const useBookings = createDataHook<IBooking>('booking');
export const useBooking = createDataHookById<IBooking>('booking', createBooking());
export const createUseBookingLines = (bookingId: number) => createDataHookArray<IBookingLine>(`booking/${bookingId}/lines`);
export const useBookingStatuses = createDataHookArray<IBookingStatus>('meta/booking-statuses');

export const useCourses = createDataHook<ICourse>('course');
export const useCourse = createDataHookById<ICourse>('course', createCourse());
export const createUseCourseSessions = (courseId: number) => createDataHookArray<ICourseSession>(`course/${courseId}/sessions`);
export const createUseCourseImages = (courseId: number) => createDataHookArray<ICourseImage>(`course/${courseId}/images`);

export const useFacilities = createDataHook<IFacility>('facility');
export const useFacility = createDataHookById<IFacility>('facility', createFacility());
export const createUseFacilityPlaces = (facilityId: number) => createDataHookArray<IPlace>(`facility/${facilityId}/places`);
export const createUseFacilityPlaceHours = (facilityId: number, placeId: number) =>
  createDataHookArray<IPlaceWorkingHour>(`facility/${facilityId}/places/${placeId}/hours`);
export const createUseFacilityStaff = (facilityId: number) => createDataHookArray<IFacilityStaff>(`facility/${facilityId}/staff`);

export const useSports = createDataHook<ISport>('sport');
export const useActiveSports = createDataHookArray<ISport>('sport/active');

export const useTeachers = createDataHookArray<ITeacherSummary>('teacher');
export const createUseTeacherSports = (teacherId: number) => createDataHookArray<ITeacherSport>(`teacher/${teacherId}/sports`);
export const createUseTeacherCities = (teacherId: number) => createDataHookArray<ITeacherCity>(`teacher/${teacherId}/cities`);
export const createUseTeacherHours = (teacherId: number) => createDataHookArray<ITeacherWorkingHour>(`teacher/${teacherId}/hours`);
export const createUseTeacherAvailability = (params: { placeId: number; startAt: string; endAt: string; sportId?: number }) => {
  const { placeId, startAt, endAt, sportId } = params;
  const path = `teacher/available?placeId=${placeId}&startAt=${encodeURIComponent(startAt)}&endAt=${encodeURIComponent(endAt)}${
    sportId ? `&sportId=${sportId}` : ''
  }`;
  return createDataHookArray<ITeacherSummary>(path);
};

export const useTournaments = createDataHook<ITournament>('tournament');
export const useTournament = createDataHookById<ITournament>('tournament', createTournament());
export const createUseTournamentImages = (tournamentId: number) =>
  createDataHookArray<ITournamentImage>(`tournament/${tournamentId}/images`);
export const createUseTournamentStandings = (tournamentId: number) =>
  createDataHookArray<ITournamentStanding>(`tournament/${tournamentId}/standings`);

export const useTournamentTypes = createDataHookArray<IMetaItem>('meta/tournament-types');
export const useTournamentRegStatuses = createDataHookArray<IMetaItem>('meta/tournament-reg-statuses');

export const useLogs = createDataHook<ILog>('log');
export const useLog = createDataHookById<ILog>('log', createLog());
export const useLogTypes = createDataHookArray<ILogType>('log/types');
export const useLogView = createDataHookArray<IVLog>('log/v');

export const useMenus = createDataHook<IMenu>('menu');
export const useMenu = createDataHookById<IMenu>('menu', createMenu());
export const useMenuTree = createDataHookArray<IMenuNode>('menu/tree');
export const createUseMenuTree = (includeInactive = false) =>
  createDataHookArray<IMenuNode>(includeInactive ? 'menu/tree?includeInactive=true' : 'menu/tree');
export const createUseMenusForRole = (roleId: number) => createDataHookArray<IMenuNode>(`menu/role/${roleId}`);
export const createUseMenusForUser = (userId: number) => createDataHookArray<IMenuNode>(`menu/user/${userId}`);
export const useMyMenus = createDataHookArray<IMenuNode>('menu/me');

export const usePermissions = createDataHookArray<IPermission>('permission');

export const useRoles = createDataHook<IRole>('role');
export const useRole = createDataHookById<IRole>('role', createRole());
export const createUseRolePermissions = (roleId: number) => createDataHookArray<IPermission>(`role/${roleId}/permissions`);
export const createUseRoleMenus = (roleId: number) => createDataHookArray<IMenuNode>(`role/${roleId}/menus`);
export const createUseRoleUsers = (roleId: number) => createDataHookArray<IRoleUserSummary>(`role/${roleId}/users`);
export const useRolePermissionsList = createDataHookArray<IPermission>('role/permissions/all');

export const useUsers = createDataHook<IUser>('user');
export const useUser = createDataHookById<IUser>('user', createUser());
export const useMyProfile = createSingleDataHook<IUser>('user/me/profile', createUser());

export const useViewBookings = createDataHookArray<IVBooking>('booking');
export const useViewCourses = createDataHookArray<IVCourse>('course');
export const useViewTournaments = createDataHookArray<IVTournament>('tournament');
export const useViewUsers = createDataHookArray<IVUser>('user');
export const useViewFacilities = createDataHookArray<IVFacility>('facility');

const allDataPagination = { page: 0, pageSize: 1000 };

export const useAllSports = (sort?: GridSortModel) => useSports(allDataPagination, sort);
export const useAllPermissions = () => usePermissions();
export const useAllRoles = (sort?: GridSortModel, filter?: GridFilterModel) => useRoles(allDataPagination, sort, filter);
export const useAllMenus = (sort?: GridSortModel, filter?: GridFilterModel) => useMenus(allDataPagination, sort, filter);
export const useAllFacilities = (sort?: GridSortModel, filter?: GridFilterModel) => useFacilities(allDataPagination, sort, filter);
export const useAllUsers = (sort?: GridSortModel, filter?: GridFilterModel) => useUsers(allDataPagination, sort, filter);
